using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface IIncidentDeviceService
    {

        Task<IEnumerable<DTOIncidentDevice>> GetIncidentDevice();
        //Task<DTOIncidentDevice> GetIncidentDevice(int id);
        //Task<bool> UpdateIncidentDevice(DTOIncidentDevice incidentDevice);
        Task<bool> AddIncidentDevice(DTOIncidentDevice incdev);
        //Task<bool> DeleteIncidentDevice(int id);
    }
}
