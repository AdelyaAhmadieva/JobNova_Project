using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class CandidateConfiguration
{
    public void Configure(EntityTypeBuilder<CandidateEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.FirstName).HasMaxLength(80).IsRequired();
        builder.Property(x => x.LastName).HasMaxLength(80).IsRequired();
        builder.Property(x => x.Email).IsRequired();
        builder.Property(x => x.Role).IsRequired();
        builder.Property(x => x.PasswordHash).IsRequired();

        builder.Property(x => x.Introduction);
        builder.Property(x => x.Phone);
        builder.Property(x => x.Website);
        builder.Property(x => x.Occupation);
        
        builder.Property(x => x.Skills).IsRequired();
        builder.Property(x => x.Resumes).IsRequired();
    }
}