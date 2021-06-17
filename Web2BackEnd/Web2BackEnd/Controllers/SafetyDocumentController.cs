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
    public class SafetyDocumentController : ControllerBase
    {

        private readonly SafetyDocumentService _service;
        public SafetyDocumentController(DataContext context, IMapper mapper)
        {
            _service = new SafetyDocumentService(context, mapper);
        }

        [HttpGet]
        public async Task<IEnumerable<DTOSafetyDocument>> GetSafetyDocument()
        {
            return await _service.GetSafetyDocument();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DTOSafetyDocument>> GetSafetyDocument(int id)
        {
            DTOSafetyDocument document = await _service.GetSafetyDocument(id);

            if (document == null)
            {
                return NotFound();
            }

            return document;
        }

        [HttpPost]
        public async Task<IActionResult> AddSafetyDocument([FromForm]DTOSafetyDocument document)
        {
            bool success = await _service.AddDocument(document);

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
