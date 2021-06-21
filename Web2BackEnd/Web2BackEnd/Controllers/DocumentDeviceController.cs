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
    public class DocumentDeviceController : ControllerBase
    {


        private readonly DocumentDeviceService _service;
        public DocumentDeviceController(DataContext context, IMapper mapper)
        {
            _service = new DocumentDeviceService(context, mapper);
        }

        [HttpPost]
        public async Task<IActionResult> AddDocumentDevice([FromForm] DTODocumentDevice incdev)
        {

            bool success = await _service.AddDocumentDevice(incdev);

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
        public async Task<IEnumerable<DTODocumentDevice>> GetDocumentDevice()
        {
            return await _service.GetDocumentDevice();
        }
    }
}
