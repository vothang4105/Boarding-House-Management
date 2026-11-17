using MBHMS.Domain.Constants;

namespace MBHMS.Infrastructure.Security;

public static class BcryptPasswordHasher
{
    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, workFactor: BusinessRulesConstants.BcryptWorkFactor);
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}
