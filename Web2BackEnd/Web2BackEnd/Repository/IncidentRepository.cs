using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class IncidentRepository : GenericRepository<Incident>, IIncidentRepository
    {
        public IncidentRepository(DataContext context):base(context) { }

        public bool IncidentExists(int id)
        {
            return _context.Incidents.Any(inc => inc.ID == id);
        }
    }
}
