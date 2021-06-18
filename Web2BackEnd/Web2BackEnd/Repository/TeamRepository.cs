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
    public class TeamRepository : GenericRepository<Team>, ITeamRepository
    {
        public TeamRepository(DataContext context) : base(context)
        {
        }

        public bool TeamExists(int id)
        {
            return _context.Teams.Any(team => team.TeamID == id);
        }

		public override async Task<IEnumerable<Team>> GetAll()
		{
			return await _dbSet.ToListAsync();
		}

		public override void Update(Team model)
		{
			_context.Entry(model).State = EntityState.Modified;
		}

		public override async Task<Team> Get(int id)
		{
			return await _dbSet.FirstOrDefaultAsync(team => team.TeamID == id);
		}

		public override void Add(Team model)
		{
			_dbSet.Add(model);
		}
	}
}
