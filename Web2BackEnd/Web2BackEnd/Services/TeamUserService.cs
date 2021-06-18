using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;
using Web2BackEnd.Services.Interface;

namespace Web2BackEnd.Services
{
    public class TeamUserService : ITeamUserService
    {
        private readonly TeamUserRepository _teamUserRepository;
        private readonly IMapper _mapper;

        public TeamUserService(DataContext context, IMapper mapper)
        {
            this._teamUserRepository = new TeamUserRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddTeamUser(List<DTOTeamUser> teamUser)
        {
            bool success = true;
            foreach (DTOTeamUser tu in teamUser)
            {
                TeamUser mapTeamUser = _mapper.Map<TeamUser>(tu);
                _teamUserRepository.Add(mapTeamUser);         
            }
            try
            {
                await _teamUserRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }
    }
}
