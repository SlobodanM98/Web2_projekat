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
    public class IncidentDeviceService : IIncidentDeviceService
    {


        private readonly IncidentDeviceRepository _repository;
        private readonly IMapper _mapper;

        public IncidentDeviceService(DataContext context, IMapper mapper)
        {
            this._repository = new IncidentDeviceRepository(context);
            this._mapper = mapper;

        }
        /*
        public async Task<bool> AddIncidentDevice(List<DTOIncidentDevice> incidentDevices)
        {
            bool success = true;
            foreach (DTOIncidentDevice IC in incidentDevices)
            {
                IncidentDevice mapIncidentCall = _mapper.Map<IncidentDevice>(IC);
                _repository.Add(mapIncidentCall);
            }
            try
            {
                await _repository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }
        */
        public async Task<bool> AddIncidentDevice(DTOIncidentDevice incdev)
        {
            bool success = true;
           
           
            IncidentDevice mapIncidentCall = _mapper.Map<IncidentDevice>(incdev);
            _repository.Add(mapIncidentCall);
         
            try
            {
                await _repository.SaveChanges();
            }
            catch
            {
                success = false;
            }
            return success;
        }

        public async Task<IEnumerable<DTOIncidentDevice>> GetIncidentDevice()
        {

            IEnumerable<IncidentDevice> devices = await _repository.GetAll();
            return _mapper.Map<IEnumerable<DTOIncidentDevice>>(devices);
        }
    }
}
