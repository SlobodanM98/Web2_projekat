using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    public interface IDeviceService
    {
        Task<IEnumerable<DTODevice>> GetDevice();
        Task<DTODevice> GetDevice(int id);
        Task<bool> UpdateDevice(DTODevice device);
        Task<bool> AddDevice(DTODevice device);
        Task<bool> DeleteDevice(int id);
    }
}
