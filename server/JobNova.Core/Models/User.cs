namespace JobNova.Core.Models;

public class User: IUserBase
{
    public User(Guid id, string userName, string? email, string role, string? passwordHash)
    {
        Id = id;
        UserName = userName;
        Email = email;
        Role = role;
        PasswordHash = passwordHash;
    }

    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string? Email { get; set; }
    public string Role { get; set; }
    public string? PasswordHash { get; set; }

    public ICollection<Vacansion> Vacansions { get; } = new List<Vacansion>();

    public static (string,User) Create(Guid id, string userName, string? email, string role, string? password)
    {
        string error = String.Empty;
        if (userName.Length < 3)
            error = "User name is too short";
        if (email is null || password is null)
            error = "Fill all fields";
        //Дописать и валидацию для email но нормально
        
        
        
        
        return (error, new User(id, userName, email, role, password));
         
    }
}