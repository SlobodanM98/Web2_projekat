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
	public class CallController : ControllerBase
	{
		private readonly CallService _service;

		public CallController(DataContext context, IMapper mapper)
		{
			_service = new CallService(context, mapper);
		}

		//GET: api/Call
		[HttpGet]
		public async Task<IEnumerable<DTOCall>> GetCall()
		{
			return await _service.GetCall();
		}

		//GET: api/Call/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOCall>> GetCall(int id)
		{
			DTOCall call = await _service.GetCall(id);

			if (call == null)
			{
				return NotFound();
			}

			return call;
		}

		//PUT: api/Call
		[HttpPut]
		public async Task<IActionResult> UpdateCall(DTOCall call)
		{
			bool success = await _service.UpdateCall(call);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/Call
		[HttpPost]
		public async Task<IActionResult> AddCall(DTOCall call)
		{
			bool success = await _service.AddCall(call);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//DELETE: api/Call/3
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCall(int id)
		{
			bool success = await _service.DeleteCall(id);

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
