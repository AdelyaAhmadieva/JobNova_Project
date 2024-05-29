using JobNova.Core.Models;

namespace JobNova.Core.Abstractions.Interfaces;

public interface IVacansionRepository
{
    Task<List<Vacansion>> GetAll(Guid userId);
    Task<Guid> Create(Vacansion vacansion, Guid userId);
    Task<Guid> Update(Guid id, string title, string description);
    Task<Guid> Delete(Guid id);
}