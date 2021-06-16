using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface IIncidentService
    {
        Task<IEnumerable<DTOIncident>> GetIncidents();
        Task<DTOIncident> GetIncident(int id);

        Task<bool> AddIncident(DTOIncident incident);


    }
}
