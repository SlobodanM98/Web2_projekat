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
	public class IncidentDeviceController : ControllerBase
	{

		private readonly IncidentDeviceService _service;
		public IncidentDeviceController(DataContext context, IMapper mapper)
		{
			_service = new IncidentDeviceService(context, mapper);
		}


		/*
		[HttpPost]
		public async Task<IActionResult> AddIncidentDevice(List<DTOIncidentDevice> incidentDevices)
		{
			bool success = await _service.AddIncidentDevice(incidentDevices);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}
		*/
		[HttpPost]
		public async Task<IActionResult> AddIncidentDevice([FromForm]DTOIncidentDevice incdev)
        {

			bool success = await _service.AddIncidentDevice(incdev);

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
		public async Task<IEnumerable<DTOIncidentDevice>> GetIncidentDevice()
		{
			return await _service.GetIncidentDevice();
		}
		


		
	}
}
