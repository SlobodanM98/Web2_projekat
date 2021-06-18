using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    public interface ITeamUserService
    {
        Task<bool> AddTeamUser(List<DTOTeamUser> teamUser);
    }
}
