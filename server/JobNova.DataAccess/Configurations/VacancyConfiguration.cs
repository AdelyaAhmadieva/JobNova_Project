using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class VacancyConfiguration
{
    public void Configure(EntityTypeBuilder<VacancyEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title).HasMaxLength(80).IsRequired();
        builder.Property(x => x.Description).HasMaxLength(500).IsRequired();
        builder.Property(x => x.JobType).IsRequired();
        builder.Property(x => x.JobCategory).IsRequired();
        builder.Property(x => x.RequiredSkills).IsRequired();
        builder.Property(x => x.Experience).IsRequired();
        builder.Property(x => x.Industry).IsRequired();
        builder.Property(x => x.Address).IsRequired();
        builder.Property(x => x.Country).IsRequired();
        builder.Property(x => x.EmployerId).IsRequired();
    }
}