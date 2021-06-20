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
    public class IncidentService : IIncidentService
    {

        private readonly IncidentRepository _incidentRepository;
        private readonly IMapper _mapper;

        public IncidentService(DataContext context, IMapper mapper)
        {
            this._incidentRepository = new IncidentRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddIncident(DTOIncident incident)
        {
            Incident mapIncident = _mapper.Map<Incident>(incident);
            _incidentRepository.Add(mapIncident);
            bool success = true;

            try
            {
                await _incidentRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public async Task<DTOIncident> GetIncident(int id)
        {
            Incident incident = await _incidentRepository.Get(id);
            return _mapper.Map<DTOIncident>(incident);
        }

        public async Task<IEnumerable<DTOIncident>> GetIncidents()
        {
            IEnumerable<Incident> incidents = await _incidentRepository.GetAll();
            return _mapper.Map<IEnumerable<DTOIncident>>(incidents);
        }

        public async Task<bool> UpdateIncident(DTOIncident incident)
        {
            Incident mapIncident = _mapper.Map<Incident>(incident);
            _incidentRepository.Update(mapIncident);

            bool success = true;

            try
            {
                await _incidentRepository.SaveChanges();
            }
            catch
            {
                if (!_incidentRepository.IncidentExists(incident.ID))
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
