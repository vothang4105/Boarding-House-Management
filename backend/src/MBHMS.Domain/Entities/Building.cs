using MBHMS.Domain.Common;

namespace MBHMS.Domain.Entities;

public class Building : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public int TotalRooms { get; set; }
    public Guid? ManagerId { get; set; }
    public string? Description { get; set; }
}
