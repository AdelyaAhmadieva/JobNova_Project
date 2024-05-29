namespace JobNova.Core.Models;

public interface IUserBase
{
    Guid Id { get; set; }
    string Role { get; set; }
    
}