using JobNova.Core.Models;
using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class ResumeConfiguration
{
    public void Configure(EntityTypeBuilder<ResumeEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.Skills).IsRequired();
        builder.Property(x => x.CandidateId).IsRequired();

    }
}