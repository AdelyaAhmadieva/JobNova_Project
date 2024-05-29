using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class EmployerConfiguration
{
    public void Configure(EntityTypeBuilder<EmployerEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.EmployerName).HasMaxLength(80).IsRequired();
        builder.Property(x => x.Email).IsRequired();
        builder.Property(x => x.Role).IsRequired();
        builder.Property(x => x.PasswordHash).IsRequired();
        
        
        builder.Property(x => x.Founder);
        builder.Property(x => x.FoundingDate);
        builder.Property(x => x.Address);
        builder.Property(x => x.NumberOfEmployees);
        builder.Property(x => x.Website);
        builder.Property(x => x.Story);
        builder.Property(x => x.EmailToConnect);
    }
}
