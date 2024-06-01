namespace JobNova.DataAccess.Entities;

public class EmployerEntity
{
    public Guid Id { get; set; }
    public string EmployerName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? PasswordHash { get; set; } = string.Empty;

    public ICollection<VacancyEntity> Vacancies { get; } = new List<VacancyEntity>();
    
    public string Founder { get; set; } = string.Empty;
    public string FoundingDate { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string NumberOfEmployees { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string Story { get; set; } = string.Empty;
    public string EmailToConnect { get; set; } = string.Empty;
}