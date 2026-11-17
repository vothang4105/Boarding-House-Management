using MBHMS.Application.Common.Interfaces;
using MBHMS.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace MBHMS.Infrastructure.Persistence.Interceptors;

public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly ICurrentUserService? _currentUserService;

    public AuditableEntitySaveChangesInterceptor(
        IDateTimeProvider dateTimeProvider,
        ICurrentUserService? currentUserService = null)
    {
        _dateTimeProvider = dateTimeProvider;
        _currentUserService = currentUserService;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    public void UpdateEntities(DbContext? context)
    {
        if (context == null) return;

        var currentTime = _dateTimeProvider.Now;
        var currentUserId = _currentUserService?.UserId;

        foreach (var entry in context.ChangeTracker.Entries<AuditableEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = currentTime;
                entry.Entity.CreatedBy = currentUserId;
            }
            else if (entry.State == EntityState.Modified || entry.HasChangedOwnedEntities())
            {
                entry.Entity.UpdatedAt = currentTime;
                entry.Entity.UpdatedBy = currentUserId;
            }
        }
    }
}

public static class Extensions
{
    public static bool HasChangedOwnedEntities(this Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry) =>
        entry.References.Any(r =>
            r.TargetEntry != null &&
            r.TargetEntry.Metadata.IsOwned() &&
            (r.TargetEntry.State == EntityState.Added || r.TargetEntry.State == EntityState.Modified));
}
