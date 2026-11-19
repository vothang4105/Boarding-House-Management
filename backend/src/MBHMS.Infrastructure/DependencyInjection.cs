using MBHMS.Application.Common.Interfaces;
using MBHMS.Domain.Common;
using MBHMS.Infrastructure.Persistence;
using MBHMS.Infrastructure.Persistence.Interceptors;
using MBHMS.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MBHMS.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // 1. Khóa cứng múi giờ Việt Nam (UTC+7 theo NFR-13)
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        // 2. Interceptor phục vụ ghi Audit Log (NFR-11)
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        // 3. Cấu hình EF Core DbContext kết nối PostgreSQL
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<AppDbContext>((sp, options) =>
        {
            if (!string.IsNullOrEmpty(connectionString))
            {
                options.UseNpgsql(connectionString, builder =>
                {
                    builder.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
                    builder.EnableRetryOnFailure(
                        maxRetryCount: 3,
                        maxRetryDelay: TimeSpan.FromSeconds(5),
                        errorCodesToAdd: null);
                });
            }
        });

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<AppDbContext>());

        return services;
    }
}
