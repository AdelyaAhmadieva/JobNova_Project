namespace JobNova.DataAccess.Entities;

public class VacancyEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public string JobType { get; set; } = String.Empty;
    public string JobCategory { get; set; } = String.Empty; 
    
    public int? MinSalary { get; set; } = 0; 
    public int? MaxSalary { get; set; } = 0;

    public List<string> RequiredSkills { get; set; } = new List<string>();
    public string Experience { get; set; } = String.Empty; 
    public string Industry { get; set; } = String.Empty; 
    public string Address { get; set; } = String.Empty; 
    public string Country { get; set; } = String.Empty; 

    public Guid EmployerId { get; set; }
    public EmployerEntity EmployerEntity { get; set; } = null!;
}