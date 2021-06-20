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
    public class IncidentCallRepository : GenericRepository<IncidentCall>, IIncidentCallRepository
    {
        public IncidentCallRepository(DataContext context) : base(context)
        {

        }

        public async Task<IEnumerable<IncidentCall>> getAll(int id)
        {
            List<IncidentCall> incidentCalls = await _dbSet.ToListAsync();
            return incidentCalls.FindAll(incidentcall => incidentcall.IncidentID == id);
        }

        public override void Update(IncidentCall model)
        {
            _context.Entry(model).State = EntityState.Modified;
        }

        public override async Task<IncidentCall> Get(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(teamUser => teamUser.ID == id);
        }

        public override void Add(IncidentCall model)
        {
            _dbSet.Add(model);
        }

    }
}
