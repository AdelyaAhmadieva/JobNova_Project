namespace JobNova.Core.Models;

public class Employer : IUserBase
{
    public Employer(
        Guid id, string employerName, string? email, string role, string? passwordHash,
        string? founder, string? foundingDate, string? address, string? numberOfEmployees, 
        string? website, string? story, string? emailToConnect)
    {
        Id = id;
        EmployerName = employerName;
        Email = email;
        Role = role;
        PasswordHash = passwordHash;

        Founder = founder;
        FoundingDate = foundingDate;
        Address = address;
        NumberOfEmployees = numberOfEmployees;
        Website = website;
        Story = story;
        EmailToConnect = emailToConnect;
    }
    
    //Data for registration
    public Guid Id { get; set; }
    public string EmployerName { get; set; }
    public string? Email { get; set; }
    public string Role { get; set; }
    public string? PasswordHash { get; set; }

    public ICollection<Vacancy> Vacancies { get; } = new List<Vacancy>();
    
    // Data for users
    
    public string? Founder { get; set; }
    public string? FoundingDate { get; set; }
    public string? Address { get; set; } 
    public string? NumberOfEmployees { get; set; }
    public string? Website { get; set; }
    public string? Story { get; set; }
    public string? EmailToConnect { get; set; }
    
    
    public static (string,Employer) Create
        (Guid id, string employerName, string? email, string role, string? password,
            string? founder, string? foundingDate, string? address, string? numberOfEmployees, 
            string? website, string? story, string? emailToConnect )
    {
        string error = String.Empty;
        if (employerName.Length < 5)
            error = "User name is too short";
        if (email is null || password is null)
            error = "Fill all fields";
        
        //Дописать и валидацию для email но нормально
        
        
        return (error, new Employer(
            id, employerName, email, role, password, founder, foundingDate, address,
            numberOfEmployees, website, story, emailToConnect));
         
    }
}