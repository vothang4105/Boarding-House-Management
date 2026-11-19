using MBHMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MBHMS.Infrastructure.Persistence.Configurations;

public class BuildingConfiguration : IEntityTypeConfiguration<Building>
{
    public void Configure(EntityTypeBuilder<Building> builder)
    {
        builder.ToTable("buildings");

        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id).HasColumnName("id");

        builder.Property(b => b.Name)
            .HasColumnName("name")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(b => b.Address)
            .HasColumnName("address")
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(b => b.TotalRooms)
            .HasColumnName("total_rooms")
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(b => b.ManagerId)
            .HasColumnName("manager_id");

        builder.Property(b => b.Description)
            .HasColumnName("description")
            .HasMaxLength(1000);

        builder.Property(b => b.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(b => b.CreatedBy)
            .HasColumnName("created_by");

        builder.Property(b => b.UpdatedAt)
            .HasColumnName("updated_at");

        builder.Property(b => b.UpdatedBy)
            .HasColumnName("updated_by");

        builder.Property(b => b.IsDeleted)
            .HasColumnName("is_deleted")
            .HasDefaultValue(false)
            .IsRequired();

        builder.Property(b => b.DeletedAt)
            .HasColumnName("deleted_at");

        builder.Property(b => b.DeletedBy)
            .HasColumnName("deleted_by");

        // Indexes
        builder.HasIndex(b => b.Name);
        builder.HasIndex(b => b.ManagerId);
        builder.HasIndex(b => b.IsDeleted);

        // Global Query Filter (Soft Delete)
        builder.HasQueryFilter(b => !b.IsDeleted);
    }
}
