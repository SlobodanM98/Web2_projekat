using System;
using System.Collections.Generic;
using System.IO;
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
        public async Task<IActionResult> AddSafetyDocument(DTOSafetyDocument document)
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

        [HttpPut]
        public async Task<IActionResult> UpdateDocument(DTOSafetyDocument doc)
        {
            bool success = await _service.UpdateSafetyDocument(doc);

            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [Route("Image/{id}"), HttpGet]
        public async Task<IEnumerable<string>> GetDocumentImage(int id)
        {
            IEnumerable<DTODocumentImage> images = await _service.GetDocumentImage();
            List<string> output = new List<string>();
            foreach (DTODocumentImage image in images)
            {
                if (image.SafetyDocument.ID == id)
                {
                    output.Add(image.ImagePath);
                }
            }

            return output;
        }

        [HttpPost, Route("Image")]
        public async Task<IActionResult> AddDocumentImage()
        {
            DTODocumentImage documentImage = new DTODocumentImage();
            if (Request.Form.Files[0] != null)
            {
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (Request.Form.Files[0].Length > 0)
                {
                    var fullPath = Path.Combine(pathToSave, Request.Form.Files[0].FileName);
                    var dbPath = Path.Combine("Images", Request.Form.Files[0].FileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        Request.Form.Files[0].CopyTo(stream);
                    }

                    using (var target = new MemoryStream())
                    {
                        Request.Form.Files[0].CopyTo(target);
                        documentImage.Image = target.ToArray();
                    }
                    documentImage.ImagePath = dbPath;
                    documentImage.SafetyDocument = new Models.SafetyDocument();
                    documentImage.SafetyDocument.ID = int.Parse(Request.Form["ID"]);
                }
            }

            bool success = await _service.AddDocumentImage(documentImage);

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
        public async Task<IActionResult> DeleteDocument(int id)
        {
            bool success = await _service.DeleteSafetyDocument(id);

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
