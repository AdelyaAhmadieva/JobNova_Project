namespace JobNova.DataAccess.Entities;

public class UserEntity
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? PasswordHash { get; set; } = string.Empty;
    
    
    public ICollection<VacansionEntity> Vacansions { get; } = new List<VacansionEntity>();
}