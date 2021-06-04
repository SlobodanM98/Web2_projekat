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
	public class NotificationController : ControllerBase
	{
		private readonly NotificationService _service;

		public NotificationController(DataContext context, IMapper mapper)
		{
			_service = new NotificationService(context, mapper);
		}

		//GET: api/Notification
		[HttpGet]
		public async Task<IEnumerable<DTONotification>> GetNotification()
		{
			return await _service.GetNotification();
		}

		//GET: api/Notification/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTONotification>> GetNotification(int id)
		{
			DTONotification notification = await _service.GetNotification(id);

			if (notification == null)
			{
				return NotFound();
			}

			return notification;
		}

		//PUT: api/Notification
		[HttpPut]
		public async Task<IActionResult> UpdateNotification(DTONotification notification)
		{
			bool success = await _service.UpdateNotification(notification);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/Notification
		[HttpPost]
		public async Task<IActionResult> AddNotification(DTONotification notification)
		{
			bool success = await _service.AddNotification(notification);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//DELETE: api/Notification/3
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteNotification(int id)
		{
			bool success = await _service.DeleteNotification(id);

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
