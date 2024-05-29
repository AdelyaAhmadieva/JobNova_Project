using JobNova.Core.Models;

namespace JobNova.Application.Services;

public interface IVacansionsService
{
    Task<List<Vacansion>> GetAllVacansions(Guid userId);
    Task<Guid> CreateVacansion(Vacansion vacansion, Guid userId);
    Task<Guid> DeleteVacansion(Guid vacansionId);
    Task<Guid> UpdateVacansion(Guid id, string Title, string Description);
}