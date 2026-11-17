namespace MBHMS.Application.Common.Models;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public object? Errors { get; set; }
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;

    public static ApiResponse<T> SuccessResult(T data, string message = "Thao tác thành công.")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data,
            Errors = null,
            Timestamp = DateTimeOffset.UtcNow
        };
    }

    public static ApiResponse<T> FailureResult(string message, object? errors = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Data = default,
            Errors = errors,
            Timestamp = DateTimeOffset.UtcNow
        };
    }
}

public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse SuccessResult(string message = "Thao tác thành công.")
    {
        return new ApiResponse
        {
            Success = true,
            Message = message,
            Data = null,
            Errors = null,
            Timestamp = DateTimeOffset.UtcNow
        };
    }

    public static new ApiResponse FailureResult(string message, object? errors = null)
    {
        return new ApiResponse
        {
            Success = false,
            Message = message,
            Data = null,
            Errors = errors,
            Timestamp = DateTimeOffset.UtcNow
        };
    }
}
