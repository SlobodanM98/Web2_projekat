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
    public class TeamUserController : ControllerBase
    {
        private readonly TeamUserService _service;

        public TeamUserController(DataContext context, IMapper mapper)
        {
            _service = new TeamUserService(context, mapper);
        }

		//POST: api/Consumer
		[HttpPost]
		public async Task<IActionResult> AddTeam(List<DTOTeamUser> teamUser)
		{
			bool success = await _service.AddTeamUser(teamUser);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}
	}
}
