using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class VacancyConfiguration
{
    public void Configure(EntityTypeBuilder<VacancyEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title)
            .HasMaxLength(Vacancy.MaxLength)
            .IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.Salary).IsRequired();
        builder.Property(x => x.EmployerId).IsRequired();

    }
}