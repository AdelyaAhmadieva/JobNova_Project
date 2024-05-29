namespace JobNova.Core.Models;

public class Vacancy
{
    public const int MaxLength = 250;
    public Vacancy(Guid id, string title, string description, Guid employerId, int salary)
    {
        Id = id;
        Title = title;
        Description = description;
        EmployerId = employerId;
        Salary = salary;
    }
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Salary { get; set; }
    public Guid EmployerId{ get; set; }
    public Employer Employer { get; set; } = null!;

    
    
    public static (string error, Vacancy vacancy) 
        Create(Guid id, string title, string description, Guid employerId, int salary)
    {
        string error = String.Empty;
        var vacancy = new Vacancy(id, title, description, employerId, salary);
        if (title.Length > MaxLength)
        {
            error = "length error";
        }
        return (error, vacancy);
    }
}