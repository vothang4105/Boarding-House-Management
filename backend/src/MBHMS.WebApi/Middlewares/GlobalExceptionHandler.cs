using MBHMS.Application.Common.Models;
using MBHMS.Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace MBHMS.WebApi.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Đã xảy ra ngoại lệ chưa được xử lý: {Message}", exception.Message);

        var (statusCode, message, errors) = exception switch
        {
            ValidationException validationEx => (
                StatusCodes.Status400BadRequest,
                validationEx.Message,
                validationEx.Errors.Count > 0 ? (object)validationEx.Errors : null
            ),
            BusinessRuleException brEx => (
                StatusCodes.Status400BadRequest,
                brEx.Message,
                !string.IsNullOrEmpty(brEx.RuleCode) ? (object)new { ruleCode = brEx.RuleCode } : null
            ),
            NotFoundException notFoundEx => (
                StatusCodes.Status404NotFound,
                notFoundEx.Message,
                null
            ),
            ForbiddenAccessException forbiddenEx => (
                StatusCodes.Status403Forbidden,
                forbiddenEx.Message,
                null
            ),
            UnauthorizedAccessException => (
                StatusCodes.Status401Unauthorized,
                "Yêu cầu xác thực tài khoản để thực hiện thao tác này.",
                null
            ),
            _ => (
                StatusCodes.Status500InternalServerError,
                "Đã xảy ra lỗi nội bộ máy chủ. Vui lòng thử lại sau.",
                null
            )
        };

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "application/json; charset=utf-8";

        var response = ApiResponse.FailureResult(message, errors);

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}
