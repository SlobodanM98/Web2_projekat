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
    public class IncidentController : ControllerBase
    {
        private readonly IncidentService _service;
        public IncidentController(DataContext context, IMapper mapper)
        {
            _service = new IncidentService(context, mapper);
        }

        [HttpGet]
        public async Task<IEnumerable<DTOIncident>> GetIncidents()
        {
            return await _service.GetIncidents();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            bool success = await _service.DeleteIncident(id);

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
        [Route("/id")]
        public async Task<ActionResult<DTOIncident>> GetIncident(int id)
        {
            DTOIncident incident = await _service.GetIncident(id);
            if (incident == null)
            {
                return NotFound();
            }

            return incident;

        }

        [HttpPost]
        public async Task<ActionResult<DTOIncident>> AddIncident([FromForm]DTOIncident incident)
        {
            bool success = await _service.AddIncident(incident);
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
        public async Task<IActionResult> UpdateIncident(DTOIncident incident)
        {
            bool success = await _service.UpdateIncident(incident);

            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost, Route("Image")]
        public async Task<IActionResult> AddIncidentImage()
        {
            DTOIncidentImage incidentImage = new DTOIncidentImage();
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
                        incidentImage.Image = target.ToArray();
                    }
                    incidentImage.ImagePath = dbPath;
                    incidentImage.Incident = new Models.Incident();
                    incidentImage.Incident.ID = int.Parse(Request.Form["ID"]);
                }
            }

            bool success = await _service.AddIncidentImage(incidentImage);

            if (success)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [Route("Image/{id}"), HttpGet]
        public async Task<IEnumerable<string>> GetIncidentImage(int id)
        {
            IEnumerable<DTOIncidentImage> images = await _service.GetIncidentImage();
            List<string> output = new List<string>();
            foreach (DTOIncidentImage image in images)
            {
                if (image.Incident.ID == id)
                {
                    output.Add(image.ImagePath);
                }
            }

            return output;
        }





    }
}
