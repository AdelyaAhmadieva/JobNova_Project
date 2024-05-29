using JobNova.Core.Infrostructure;
using Microsoft.AspNetCore.Identity;

namespace JobNova.Core.Infrastructure;
using BCrypt.Net;
public class PasswordHasher : IPasswordHasher
{
    public string Generate(string password) =>
        BCrypt.EnhancedHashPassword(password);

    public bool Verify(string password, string hashedPassword) =>
        BCrypt.EnhancedVerify(password, hashedPassword);
    
}