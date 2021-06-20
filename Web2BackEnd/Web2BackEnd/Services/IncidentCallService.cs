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
    public class IncidentCallService : IIncidentCallService
    {

        private readonly IncidentCallRepository _repository;
        private readonly IMapper _mapper;

        public IncidentCallService(DataContext context, IMapper mapper)
        {
            this._repository = new IncidentCallRepository(context);
            this._mapper = mapper;

        }

        public async Task<bool> AddIncidentCall(List<DTOIncidentCall> incidentCalls)
        {
            bool success = true;
            foreach (DTOIncidentCall IC in incidentCalls)
            {
                 IncidentCall mapIncidentCall = _mapper.Map<IncidentCall>(IC);
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


        
        public  async Task<IEnumerable<DTOIncidentCall>> GetIncidentCall()
        {

            IEnumerable<IncidentCall> calls = await _repository.GetAll();
            return _mapper.Map<IEnumerable<DTOIncidentCall>>(calls);
        }
        

        

   
    }
}
