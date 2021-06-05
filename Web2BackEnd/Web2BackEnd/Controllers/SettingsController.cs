using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Services;

namespace Web2BackEnd.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SettingsController : ControllerBase
	{
		private readonly SettingsService _service;

		public SettingsController(DataContext context, IMapper mapper)
		{
			_service = new SettingsService(context, mapper);
		}

		//GET: api/Settings/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOSettings>> GetSettings(int id)
		{
			DTOSettings settings = await _service.GetSettings(id);

			if (settings == null)
			{
				return NotFound();
			}

			return settings;
		}

		//PUT: api/Settings
		[HttpPut]
		public async Task<IActionResult> UpdateSettings(DTOSettings settings)
		{
			bool success = await _service.UpdateSettings(settings);

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
