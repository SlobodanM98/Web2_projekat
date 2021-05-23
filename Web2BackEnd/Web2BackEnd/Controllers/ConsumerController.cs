using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;
using Web2BackEnd.Services;

namespace Web2BackEnd.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConsumerController : ControllerBase
	{
		private readonly ConsumerService _service;

		public ConsumerController(DataContext context, IMapper mapper)
		{
			_service = new ConsumerService(context, mapper);
		}

		//GET: api/Consumer
		[HttpGet]
		public async Task<IEnumerable<DTOConsumer>> GetConsumer()
		{
			return await _service.GetConsumer();
		}

		//GET: api/Consumer/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOConsumer>> GetConsumer(int id)
		{
			DTOConsumer consumer = await _service.GetConsumer(id);

			if (consumer == null)
			{
				return NotFound();
			}

			return consumer;
		}

		//PUT: api/Consumer
		[HttpPut]
		public async Task<IActionResult> UpdateConsumer(DTOConsumer consumer)
		{
			bool success = await _service.UpdateConsumer(consumer);

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
		public async Task<IActionResult> AddConsumer(DTOConsumer consumer)
		{
			bool success = await _service.AddConsumer(consumer);

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
		public async Task<IActionResult> DeleteConsumer(int id)
		{
			bool success = await _service.DeleteConsumer(id);

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
