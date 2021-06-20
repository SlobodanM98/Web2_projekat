using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Services;

namespace Web2BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentController : ControllerBase
    {
        private readonly IncidentService _service;
        public IncidentController(DataContext context, IMapper mapper)
        {
            _service = new IncidentService(context, mapper);
        }

        [HttpGet]
        public async Task<IEnumerable<DTOIncident>> GetIncidents()
        {
            return await _service.GetIncidents();

        }

        [HttpGet]
        [Route("/id")]
        public async Task<ActionResult<DTOIncident>> GetIncident(int id)
        {
            DTOIncident incident = await _service.GetIncident(id);
            if (incident == null)
            {
                return NotFound();
            }

            return incident;

        }

        [HttpPost]
        public async Task<ActionResult<DTOIncident>> AddIncident([FromForm]DTOIncident incident)
        {
            bool success = await _service.AddIncident(incident);
            if (success)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        
        

        [HttpPut]
        public async Task<IActionResult> UpdateIncident(DTOIncident incident)
        {
            bool success = await _service.UpdateIncident(incident);

            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }


        
        

    }
}
