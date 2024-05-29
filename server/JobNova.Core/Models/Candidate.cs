namespace JobNova.Core.Models;

public class Candidate : IUserBase
{
    public Candidate(Guid id, string firstName, string lastName, string? email, string role, string? passwordHash, 
       string? introduction, string? phone, string? website, string? occupation, List<string> skills)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = role;
        PasswordHash = passwordHash;
        
        Introduction = introduction;
        Phone = phone;
        Website = website;
        Occupation = occupation;
        Skills = skills;

    }
    
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; } 
    public string? Email { get; set; }
    public string Role { get; set; }
    public string? PasswordHash { get; set; }

    public ICollection<Resume> Resumes { get; set; } = new List<Resume>();
    
    public string? Introduction { get; set; }
    public string? Phone { get; set; }
    public string? Website { get; set; }
    
    public string? Occupation { get; set; }
    
    public List<string?>? Skills { get; set; }




    public static (string,Candidate) Create
        (Guid id, string firstName, string lastName, string? email, string role, string? password,
             string? introduction, string? phone, string? website, string? occupation, List<string> skills)
    {
        string error = String.Empty;
        if (firstName.Length < 3)
            error = "User name is too short";
        if (email is null || password is null)
            error = "Fill all fields";
        //Дописать и валидацию для email но нормально
        
        
        
        
        return (error, new Candidate(id, firstName, lastName, email, role, password, introduction, phone, website, occupation, skills));
         
    }

}
