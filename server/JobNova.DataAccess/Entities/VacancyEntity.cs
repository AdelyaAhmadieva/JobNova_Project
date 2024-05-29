namespace JobNova.DataAccess.Entities;

public class VacancyEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public int Salary { get; set; } = 0;

    public Guid EmployerId { get; set; }
    public EmployerEntity EmployerEntity { get; set; } = null!;
}