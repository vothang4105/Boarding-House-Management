using MBHMS.Domain.Enums;

namespace MBHMS.Application.Common.Interfaces;

public interface ICurrentUserService
{
    Guid? UserId { get; }
    string? Email { get; }
    UserRole? Role { get; }
    IReadOnlyList<Guid> AssignedBuildingIds { get; }
    bool IsAuthenticated { get; }
}
