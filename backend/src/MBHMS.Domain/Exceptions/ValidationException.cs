namespace MBHMS.Domain.Exceptions;

public class ValidationException : DomainException
{
    public IDictionary<string, string[]> Errors { get; }

    public ValidationException()
        : base("Đã xảy ra một hoặc nhiều lỗi xác thực dữ liệu.")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(string message)
        : base(message)
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(IDictionary<string, string[]> errors)
        : base("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.")
    {
        Errors = errors;
    }
}
