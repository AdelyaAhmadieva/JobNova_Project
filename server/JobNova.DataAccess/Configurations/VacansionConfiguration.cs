using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class VacansionConfiguration : IEntityTypeConfiguration<VacansionEntity>
{
    public void Configure(EntityTypeBuilder<VacansionEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title)
            .HasMaxLength(Vacansion.MAX_LENGTH)
            .IsRequired();
        builder.Property(x => x.Description).IsRequired();
        
        builder.Property(x => x.UserId).IsRequired();

    }

   
}