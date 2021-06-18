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
    public class TeamController : ControllerBase
    {
        private readonly TeamService _service;

        public TeamController(DataContext context, IMapper mapper)
        {
            _service = new TeamService(context, mapper);
        }

		//GET: api/Consumer
		[HttpGet]
		public async Task<IEnumerable<DTOTeam>> GetTeam()
		{
			return await _service.GetTeam();
		}

		//GET: api/Consumer/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOTeam>> GetTeam(int id)
		{
			DTOTeam team = await _service.GetTeam(id);

			if (team == null)
			{
				return NotFound();
			}

			return team;
		}

		//PUT: api/Consumer
		[HttpPut]
		public async Task<IActionResult> UpdateTeam(DTOTeam team)
		{
			bool success = await _service.UpdateTeam(team);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/Consumer
		[HttpPost]
		public async Task<IActionResult> AddTeam(DTOTeam team)
		{
			bool success = await _service.AddTeam(team);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//DELETE: api/Consumer/3
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTeam(int id)
		{
			bool success = await _service.DeleteTeam(id);

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
