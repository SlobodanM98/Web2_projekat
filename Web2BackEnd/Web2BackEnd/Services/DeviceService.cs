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
    public class DeviceService : IDeviceService
    {
        private readonly DeviceRepository _deviceRepository;
        private readonly IMapper _mapper;

        public DeviceService(DataContext context, IMapper mapper)
        {
            this._deviceRepository = new DeviceRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddDevice(DTODevice device)
        {
            Device mapDevice = _mapper.Map<Device>(device);
            _deviceRepository.Add(mapDevice);
            bool success = true;

            try
            {
                await _deviceRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public async Task<bool> DeleteDevice(int id)
        {
           Device device = await _deviceRepository.Delete(id);

            if (device == null)
            {
                return false;
            }
            else
            {
                await _deviceRepository.SaveChanges();
                return true;
            }
        }

        public async Task<IEnumerable<DTODevice>> GetDevice()
        {

            IEnumerable<Device> devices = await _deviceRepository.GetAll();
            return _mapper.Map<IEnumerable<DTODevice>>(devices);
        }

        public async Task<DTODevice> GetDevice(int id)
        {
            Device device = await _deviceRepository.Get(id);
            return _mapper.Map<DTODevice>(device);
        }

        public async Task<bool> UpdateDevice(DTODevice device)
        {
            Device mapDevice = _mapper.Map<Device>(device);
            _deviceRepository.Update(mapDevice);

            bool success = true;

            try
            {
                await _deviceRepository.SaveChanges();
            }
            catch
            {
                if (!_deviceRepository.DeviceExists(device.ID))
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
