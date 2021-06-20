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
    public class WorkAccountController : ControllerBase
    {
        private readonly WorkAccountService _service;

        public WorkAccountController(DataContext context, IMapper mapper)
        {
            _service = new WorkAccountService(context, mapper);
        }

		//POST: api/Consumer
		[HttpPost]
		public async Task<IActionResult> AddWorkAccount(DTOWorkAccount workAccount)
		{
			bool success = await _service.AddWorkAccount(workAccount);

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
		public async Task<IActionResult> DeleteWorkAccount(int id)
		{
			bool success = await _service.DeleteWorkAccount(id);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		[HttpGet]
		public async Task<IEnumerable<DTOWorkAccount>> GetWorkAccount()
		{
			return await _service.GetWorkAccount();
		}

		//GET: api/Consumer/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOWorkAccount>> GetConsumer(int id)
		{
			DTOWorkAccount workAccount = await _service.GetWorkAccount(id);

			if (workAccount == null)
			{
				return NotFound();
			}

			return workAccount;
		}

		//PUT: api/Consumer
		[HttpPut]
		public async Task<IActionResult> UpdateWorkAccount(DTOWorkAccount workAccount)
		{
			bool success = await _service.UpdateWorkAccount(workAccount);

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
