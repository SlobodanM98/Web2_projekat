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
    public class IncidentCallController : ControllerBase
    {

		private readonly IncidentCallService _service;
		public IncidentCallController(DataContext context, IMapper mapper)
		{
			_service = new IncidentCallService(context, mapper);
		}



		[HttpPost]
		public async Task<IActionResult> AddIncidentCall(List<DTOIncidentCall> incidentCalls)
		{
			bool success = await _service.AddIncidentCall(incidentCalls);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}
		[HttpGet]
		public async Task<IEnumerable<DTOIncidentCall>> GetIncidentCall()
		{
			return await _service.GetIncidentCall();
		}
	}
}
