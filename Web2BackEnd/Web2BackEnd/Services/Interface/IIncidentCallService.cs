using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface IIncidentCallService
    {
        Task<IEnumerable<DTOIncidentCall>> GetIncidentCall();
        //Task<DTOIncidentCall> GetIncidentCall (int id);
        //Task<bool> UpdateIncidentCall(DTOIncidentCall incidentCall);
        Task<bool> AddIncidentCall(List<DTOIncidentCall> incidentCalls);
        //Task<bool> DeleteIncidentCall(int id);
    }
}
