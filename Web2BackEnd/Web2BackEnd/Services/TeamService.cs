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
    public class TeamService : ITeamService
    {
        private readonly TeamRepository _teamRepository;
        private readonly TeamUserRepository _teamUserRepository;
        private readonly IMapper _mapper;

        public TeamService(DataContext context, IMapper mapper)
        {
            this._teamRepository = new TeamRepository(context);
            this._teamUserRepository = new TeamUserRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddTeam(DTOTeam team)
        {
            Team mapTeam = _mapper.Map<Team>(team);
            _teamRepository.Add(mapTeam);
            bool success = true;

            try
            {
                await _teamRepository.SaveChanges();
                IEnumerable<Team> teams = await _teamRepository.GetAll();
                int teamId = teams.FirstOrDefault(t => t.Name == mapTeam.Name).TeamID;
                foreach (DTOTeamUser tu in team.TeamUsers)
                {
                    TeamUser mapTeamUser = _mapper.Map<TeamUser>(tu);
                    mapTeamUser.TeamID = teamId;
                    _teamUserRepository.Add(mapTeamUser);
                }
                await _teamRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public async Task<bool> DeleteTeam(int id)
        {
            Team team = await _teamRepository.Delete(id);
            IEnumerable<TeamUser> teamUsers = await _teamUserRepository.GetAll(id);
            foreach (TeamUser tu in teamUsers)
            {
                await _teamUserRepository.Delete(tu.Id);
            }
            if (team == null)
            {
                return false;
            }
            else
            {
                await _teamRepository.SaveChanges();
                return true;
            }
        }

        public async Task<IEnumerable<DTOTeam>> GetTeam()
        {
            IEnumerable<Team> teams = await _teamRepository.GetAll();
            IEnumerable<DTOTeam> copy = _mapper.Map<IEnumerable<DTOTeam>>(teams);
            foreach(DTOTeam t in copy)
            {
                IEnumerable<TeamUser> teamUsers = await _teamUserRepository.GetAll(t.TeamID);
                t.TeamUsers = _mapper.Map<IEnumerable<DTOTeamUser>>(teamUsers);       
            }
            return copy;
        }

        public async Task<DTOTeam> GetTeam(int id)
        {
            Team team = await _teamRepository.Get(id);
            DTOTeam copy = _mapper.Map<DTOTeam>(team);
            IEnumerable<TeamUser> teamUsers = await _teamUserRepository.GetAll(team.TeamID);
            copy.TeamUsers = _mapper.Map<IEnumerable<DTOTeamUser>>(teamUsers);
            return copy;
        }

        public async Task<bool> UpdateTeam(DTOTeam team)
        {
            Team mapTeam = _mapper.Map<Team>(team);
            _teamRepository.Update(mapTeam);
            IEnumerable<TeamUser> copy = await _teamUserRepository.GetAll(team.TeamID);
            foreach(TeamUser tu in copy)
            {
                await _teamUserRepository.Delete(tu.Id);
            }
            IEnumerable<TeamUser> mapTeamUser = _mapper.Map<IEnumerable<TeamUser>>(team.TeamUsers);
            foreach(TeamUser tu in mapTeamUser)
            {
                tu.TeamID = mapTeam.TeamID;
                _teamUserRepository.Add(tu);
            }

            bool success = true;

            try
            {
                await _teamRepository.SaveChanges();
            }
            catch(Exception e)
            {
                if (!_teamRepository.TeamExists(team.TeamID))
                {
                    success = false;
                }
                else
                {
                    throw;
                }
            }

            return success;
        }
    }
}
