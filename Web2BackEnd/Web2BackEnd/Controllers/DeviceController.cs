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
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _service;

        public DeviceController(DataContext context, IMapper mapper)
        {
            _service = new DeviceService(context, mapper);
        }
        [HttpGet]
        public async Task<IEnumerable<DTODevice>> GetDevice()
        {
            return await _service.GetDevice();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DTODevice>> GetDevice(int id)
        {
            DTODevice device = await _service.GetDevice(id);

            if (device == null)
            {
                return NotFound();
            }

            return device;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDevice(DTODevice device)
        {
            bool success = await _service.UpdateDevice(device);

            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddDevice(DTODevice device)
        {
            bool success = await _service.AddDevice(device);

            if (success)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            bool success = await _service.DeleteDevice(id);

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
