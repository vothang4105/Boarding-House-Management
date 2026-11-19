using MBHMS.Domain.Entities;

namespace MBHMS.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    IQueryable<Building> Buildings { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
