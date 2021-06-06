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
	public class AddressController : ControllerBase
	{
		private readonly AddressService _service;

		public AddressController(DataContext context, IMapper mapper){
			_service = new AddressService(context, mapper);
		}

		//GET: api/Address
		[HttpGet]
		public async Task<IEnumerable<DTOAddress>> GetAddress(){
			return await _service.GetAddress();
		}

		//GET: api/Address/3
		[HttpGet]
		[Route("/{id}")]
		public async Task<ActionResult<DTOAddress>> GetAddress(int id){
			DTOAddress address = await _service.GetAddress(id);

			if(address == null){
				return NotFound();
			}

			return address;
		}

		//PUT: api/Address
		[HttpPut]
		public async Task<IActionResult> UpdateAddress(DTOAddress address){
			bool success = await _service.UpdateAddress(address);

			if(success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/Address
		[HttpPost]
		public async Task<ActionResult<DTOAddress>> AddAddress(DTOAddress address){
			bool success = await _service.AddAddress(address);

			if(success)
			{
				return CreatedAtAction("GetAddress", new { id = address.AddressID }, address);
			}
			else
			{
				return BadRequest();
			}
		}

		//DELETE: api/Address/3
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAddress(int id){
			bool success = await _service.DeleteAddress(id);

			if(success)
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
