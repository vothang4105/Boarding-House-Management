namespace MBHMS.Domain.Exceptions;

public class ForbiddenAccessException : DomainException
{
    public ForbiddenAccessException()
        : base("Bạn không có quyền truy cập hoặc thao tác trên tài nguyên này.")
    {
    }

    public ForbiddenAccessException(string message) : base(message)
    {
    }
}
