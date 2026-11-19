using MBHMS.Domain.Common;
using MBHMS.Domain.Entities;
using MBHMS.Infrastructure.Persistence;
using MBHMS.Infrastructure.Persistence.Configurations;
using MBHMS.Infrastructure.Persistence.Interceptors;
using MBHMS.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace MBHMS.UnitTests.Infrastructure;

public class AppDbContextTests
{
    private readonly IDateTimeProvider _dateTimeProvider;

    public AppDbContextTests()
    {
        _dateTimeProvider = new DateTimeProvider();
    }

    [Fact]
    public void Building_ShouldInheritFromAuditableEntity_AndImplementISoftDeletable()
    {
        // Arrange & Act
        var building = new Building
        {
            Name = "Dãy A - Khu Nhà Trọ Lan Anh",
            Address = "Khu phố 6, P. Linh Trung, TP. Thủ Đức",
            TotalRooms = 24
        };

        // Assert
        Assert.IsAssignableFrom<AuditableEntity>(building);
        Assert.IsAssignableFrom<ISoftDeletable>(building);
        Assert.IsAssignableFrom<BaseEntity>(building);
        Assert.NotEqual(Guid.Empty, building.Id);
        Assert.False(building.IsDeleted);
        Assert.Null(building.DeletedAt);
        Assert.Null(building.DeletedBy);
    }

    [Fact]
    public void BuildingConfiguration_ShouldConfigureTableNameAndIndexesProperly()
    {
        // Arrange
        var builder = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=dummy_test;Username=postgres;Password=postgres");

        var interceptor = new AuditableEntitySaveChangesInterceptor(_dateTimeProvider);

        using var context = new AppDbContext(builder.Options, interceptor);
        var model = context.Model;

        // Act
        var entityType = model.FindEntityType(typeof(Building));

        // Assert
        Assert.NotNull(entityType);
        Assert.Equal("buildings", entityType.GetTableName());

        var nameProperty = entityType.FindProperty(nameof(Building.Name));
        Assert.NotNull(nameProperty);
        Assert.False(nameProperty.IsNullable);
        Assert.Equal(200, nameProperty.GetMaxLength());

        var addressProperty = entityType.FindProperty(nameof(Building.Address));
        Assert.NotNull(addressProperty);
        Assert.False(addressProperty.IsNullable);
        Assert.Equal(500, addressProperty.GetMaxLength());

        var isDeletedProperty = entityType.FindProperty(nameof(Building.IsDeleted));
        Assert.NotNull(isDeletedProperty);
        Assert.False((bool)isDeletedProperty.GetDefaultValue()!);
    }

    [Fact]
    public void AuditableEntitySaveChangesInterceptor_ShouldSetUtc7TimeOnAuditProperties()
    {
        // Arrange
        var interceptor = new AuditableEntitySaveChangesInterceptor(_dateTimeProvider);

        var builder = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=dummy_test;Username=postgres;Password=postgres");

        using var context = new AppDbContext(builder.Options, interceptor);

        var building = new Building
        {
            Name = "Dãy B",
            Address = "Làng Đại Học Thủ Đức",
            TotalRooms = 18
        };

        context.Buildings.Add(building);

        // Act - Call UpdateEntities directly via interceptor
        interceptor.UpdateEntities(context);

        // Assert
        Assert.False(building.IsDeleted);
        Assert.True(building.CreatedAt > DateTime.MinValue);
        // Verify time matches UTC+7 DateTimeProvider Now approximately
        var now = _dateTimeProvider.Now;
        Assert.True((now - building.CreatedAt).TotalSeconds < 5);
    }

    [Fact]
    public void AuditableEntitySaveChangesInterceptor_SoftDelete_ShouldSetIsDeletedAndDeletedAt()
    {
        // Arrange
        var interceptor = new AuditableEntitySaveChangesInterceptor(_dateTimeProvider);

        var builder = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=dummy_test;Username=postgres;Password=postgres");

        using var context = new AppDbContext(builder.Options, interceptor);

        var building = new Building
        {
            Name = "Dãy C",
            Address = "Thủ Đức",
            TotalRooms = 10
        };

        context.Buildings.Add(building);
        context.Entry(building).State = EntityState.Unchanged;

        // Simulate deleting the building
        context.Buildings.Remove(building);
        Assert.Equal(EntityState.Deleted, context.Entry(building).State);

        // Act - Interceptor should intercept deletion
        interceptor.UpdateEntities(context);

        // Assert
        Assert.Equal(EntityState.Modified, context.Entry(building).State);
        Assert.True(building.IsDeleted);
        Assert.NotNull(building.DeletedAt);
        Assert.True((_dateTimeProvider.Now - building.DeletedAt.Value).TotalSeconds < 5);
    }
}
