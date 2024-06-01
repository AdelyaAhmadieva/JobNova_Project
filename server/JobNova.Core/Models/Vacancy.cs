namespace JobNova.Core.Models;

public class Vacancy
{
    public Vacancy(Guid id, string title, string description, string jobType, string jobCategory,
        int? maxSalary, int? minSalary, List<string> requiredSkills, string experience, string industry,
        string address, string country, Guid employerId)
    {
        Id = id;
        Title = title;
        Description = description;
        JobType = jobType;
        JobCategory = jobCategory;
        MinSalary = minSalary;
        MaxSalary = maxSalary;
        RequiredSkills = requiredSkills;
        Experience = experience;
        Industry = industry;
        Address = address;
        Country = country;
        EmployerId = employerId;
    }
    
    public Guid Id { get; set; }
    public string Title { get; set; } 
    public string Description { get; set; } 
    public string JobType { get; set; } 
    public string JobCategory { get; set; } 
    
    public int? MinSalary { get; set; } = 0; 
    public int? MaxSalary { get; set; } = 0;

    public List<string> RequiredSkills { get; set; } 
    public string Experience { get; set; } 
    public string Industry { get; set; } 
    public string Address { get; set; } 
    public string Country { get; set; } 

    public Guid EmployerId { get; set; }
    public Employer Employer { get; set; } = null!;

    
    
    public static (string error, Vacancy vacancy) 
        Create(Guid id, string title, string description, string jobType, string jobCategory,
            int? maxSalary, int? minSalary, List<string> requiredSkills, string experience, string industry,
            string address, string country, Guid employerId)
    {
        string error = String.Empty;
        var vacancy = new Vacancy( id,  title,  description,  jobType,  jobCategory,
             maxSalary,  minSalary, requiredSkills,  experience,  industry,
             address,  country, employerId );
        if (title.Length > 250)
        {
            error = "Too long Title";
        }
        return (error, vacancy);
    }
}