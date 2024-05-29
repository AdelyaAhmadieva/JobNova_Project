namespace JobNova.DataAccess.Entities;

public class VacansionEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;

    public Guid UserId { get; set; }
    public UserEntity User { get; set; } = null!;

}