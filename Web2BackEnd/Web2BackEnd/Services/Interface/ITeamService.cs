using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    public interface ITeamService
    {
        Task<IEnumerable<DTOTeam>> GetTeam();
        Task<DTOTeam> GetTeam(int id);
        Task<bool> UpdateTeam(DTOTeam team);
        Task<bool> AddTeam(DTOTeam team);
        Task<bool> DeleteTeam(int id);
    }
}
