using JobNova.Core.Models;

namespace JobNova.Core.Infrastructure;

public interface IJwtProvider
{
    string GenerateToken(IUserBase user);
}