namespace JobNova.Core.Models;

public class Vacansion
{
    public const int MAX_LENGTH = 250;
    public Vacansion(Guid id, string title, string description, Guid userId)
    {
        Id = id;
        Title = title;
        Description = description;
        UserId = userId;
    }
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public static (string error, Vacansion vacansion) Create(Guid id, string title, string description, Guid userId)
    {
        string error = String.Empty;
        var vacansion = new Vacansion(id, title, description, userId);
        if (title.Length > MAX_LENGTH)
        {
            error = "length error";
        }
        return (error, vacansion);
    }
}