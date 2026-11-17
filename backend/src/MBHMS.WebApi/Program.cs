using System.Text;
using MBHMS.Application;
using MBHMS.Infrastructure;
using MBHMS.WebApi.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// 1. Đăng ký các tầng kiến trúc Clean Architecture
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

// 2. Cấu hình Global Exception Handling (.NET 10 IExceptionHandler)
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// 3. Cấu hình Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 4. Cấu hình Swagger với JWT Bearer Authorization (NFR-05)
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MBHMS API - Mini Boarding House Management System",
        Version = "v1",
        Description = "Backend REST API cho Hệ thống Quản lý Nhà trọ Mini (.NET 10 Clean Architecture)"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Nhập JWT token theo định dạng: Bearer {token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(_ => new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecuritySchemeReference("Bearer"),
            new List<string>()
        }
    });
});

// 5. Cấu hình CORS
const string corsPolicyName = "AllowConfiguredOrigins";
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:3000", "http://localhost:3001" };

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// 6. Cấu hình Authentication & JWT Bearer
var jwtSecret = builder.Configuration["Jwt:Secret"]
    ?? "super_secret_jwt_key_at_least_32_characters_long_for_security_compliance";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "MBHMS.WebApi";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "MBHMS.Client";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// 7. Pipeline xử lý HTTP Requests
app.UseExceptionHandler();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "MBHMS API v1");
        options.RoutePrefix = "swagger";
    });
}

app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// Hỗ trợ WebApplicationFactory trong Integration Tests
public partial class Program { }
