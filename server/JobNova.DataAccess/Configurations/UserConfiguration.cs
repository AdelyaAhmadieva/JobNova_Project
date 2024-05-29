using JobNova.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobNova.DataAccess.Configurations;

public class UserConfiguration: IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.UserName).HasMaxLength(80).IsRequired();
        builder.Property(x => x.Email).IsRequired();
        builder.Property(x => x.Role).IsRequired();
        builder.Property(x => x.PasswordHash).IsRequired();
    }
}