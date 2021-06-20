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
    public class IncidentDeviceRepository : GenericRepository<IncidentDevice>, IIncidentDeviceRepository
    {

        public IncidentDeviceRepository(DataContext context) : base(context)
        {

        }

        public async Task<IEnumerable<IncidentDevice>> getAll(int id)
        {
            List<IncidentDevice> incidentDevices = await _dbSet.ToListAsync();
            return incidentDevices.FindAll(incidentDevice => incidentDevice.IncidentID == id);
        }

        public override void Update(IncidentDevice model)
        {
            _context.Entry(model).State = EntityState.Modified;
        }

        public override async Task<IncidentDevice> Get(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(teamUser => teamUser.ID == id);
        }
        
        public override void Add(IncidentDevice model)
        {
            _dbSet.Add(model);
            
        }
        
    }
}
