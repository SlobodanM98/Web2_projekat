using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class TeamUserRepository : GenericRepository<TeamUser>, ITeamUserRepository
    {
        public TeamUserRepository(DataContext context) : base(context)
        {
        }

        public bool TeamUserExists(int id)
        {
            return _context.TeamUsers.Any(teamUser => teamUser.Id == id);
        }

        public override async Task<IEnumerable<TeamUser>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<TeamUser>> GetAll(int id)
        {
            List<TeamUser> teamUsers = await _dbSet.ToListAsync();
            return teamUsers.FindAll(teamUser => teamUser.TeamID == id);
        }

        public override void Update(TeamUser model)
        {
            _context.Entry(model).State = EntityState.Modified;
        }

        public override async Task<TeamUser> Get(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(teamUser => teamUser.Id == id);
        }

        public override void Add(TeamUser model)
        {
            _dbSet.Add(model);
        }
    }
}
