using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Services;

namespace Web2BackEnd.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkPlanController : ControllerBase
	{
		private readonly WorkPlanService _service;

		public WorkPlanController(DataContext context, IMapper mapper)
		{
			_service = new WorkPlanService(context, mapper);
		}

		//GET: api/WorkPlan
		[HttpGet]
		public async Task<IEnumerable<DTOWorkPlan>> GetWorkPlan()
		{
			return await _service.GetWorkPlan();
		}

		//GET: api/WorkPlan/3
		[HttpGet("{id}")]
		public async Task<ActionResult<DTOWorkPlan>> GetWorkPlan(int id)
		{
			DTOWorkPlan workPlan = await _service.GetWorkPlan(id);

			if (workPlan == null)
			{
				return NotFound();
			}

			return workPlan;
		}

		//PUT: api/WorkPlan
		[HttpPut]
		public async Task<IActionResult> UpdateWorkPlan(DTOWorkPlan workPlan)
		{
			bool success = await _service.UpdateWorkPlan(workPlan);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/WorkPlan
		[HttpPost]
		public async Task<IActionResult> AddWorkPlan(DTOWorkPlan workPlan)
		{
			bool success = await _service.AddWorkPlan(workPlan);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//DELETE: api/WorkPlan/3
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteWorkPlan(int id)
		{
			bool success = await _service.DeleteWorkPlan(id);

			if (success)
			{
				return Ok();
			}
			else
			{
				return NotFound();
			}
		}

		//POST: api/WorkPlan/Image
		[HttpPost, Route("Image")]
		public async Task<IActionResult> AddWorkPlanImage()
		{
			DTOWorkPlanImage workPlanImage = new DTOWorkPlanImage();
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
						workPlanImage.Image = target.ToArray();
					}
					workPlanImage.ImagePath = dbPath;
					workPlanImage.WorkPlan = new Models.WorkPlan();
					workPlanImage.WorkPlan.WorkPlanID = int.Parse(Request.Form["ID"]);
				}
			}

			bool success = await _service.AddWorkPlanImage(workPlanImage);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//POST: api/WorkPlan/Instruction
		[HttpPost, Route("Instruction")]
		public async Task<IActionResult> AddWorkPlanInstruction()
		{
			DTOWorkInstruction workInstruction = new DTOWorkInstruction();
			workInstruction.Device = new Models.Device();
			workInstruction.Device.ID = int.Parse(Request.Form["deviceID"]);
			workInstruction.WorkPlanID = int.Parse(Request.Form["ID"]);
			workInstruction.Description = Request.Form["description"];
			workInstruction.Status = Models.InstructionStatus.Unexecuted;

			bool success = await _service.AddWorkInstruction(workInstruction);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//POST: api/WorkPlan/Instruction
		[HttpPost, Route("Device")]
		public async Task<IActionResult> AddWorkPlanDevice()
		{
			DTOWorkPlanDevice workPlanDevice = new DTOWorkPlanDevice();
			workPlanDevice.Device = new Models.Device();
			workPlanDevice.Device.ID = int.Parse(Request.Form["deviceID"]);
			workPlanDevice.WorkPlanID = int.Parse(Request.Form["ID"]);

			bool success = await _service.AddWorkPlanDevice(workPlanDevice);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//POST: api/WorkPlan/History
		[HttpPost, Route("History")]
		public async Task<IActionResult> AddWorkPlanHistory(DTOWorkPlanStatusHistory workPlanStatusHistory)
		{
			bool success = await _service.AddWorkPlanStatusHistory(workPlanStatusHistory);

			if (success)
			{
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		//GET: api/WorkPlan/History/3
		[Route("History/{id}"), HttpGet]
		public async Task<IEnumerable<int>> GetWorkPlanHistory(int id)
		{
			IEnumerable<DTOWorkPlanStatusHistory> histories = await _service.GetWorkStatusHistory();
			List<int> output = new List<int>();
			foreach (DTOWorkPlanStatusHistory history in histories)
			{
				if (history.WorkPlanID == id)
				{
					output.Add(history.WorkPlanStatusHistoryID);
				}
			}

			return output;
		}

		//GET: api/WorkPlan/History
		[HttpGet, Route("History")]
		public async Task<IEnumerable<DTOWorkPlanStatusHistory>> GetWorkPlanHistory()
		{
			return await _service.GetWorkStatusHistory();
		}

		//GET: api/WorkPlan/Device/3
		[Route("Device/{id}"), HttpGet]
		public async Task<IEnumerable<int>> GetWorkPlanDevice(int id)
		{
			IEnumerable<DTOWorkPlanDevice> devices = await _service.GetWorkPlanDevice();
			List<int> output = new List<int>();
			foreach(DTOWorkPlanDevice device in devices)
			{
				if(device.WorkPlanID == id)
				{
					output.Add(device.ID);
				}
			}

			return output;
		}

		//GET: api/WorkPlan/Image/3
		[Route("Image/{id}"), HttpGet]
		public async Task<IEnumerable<string>> GetWorkPlanImage(int id)
		{
			IEnumerable<DTOWorkPlanImage> images = await _service.GetWorkPlanImage();
			List<string> output = new List<string>();
			foreach(DTOWorkPlanImage image in images)
			{
				if(image.WorkPlan.WorkPlanID == id)
				{
					output.Add(image.ImagePath);
				}
			}

			return output;
		}

		//GET: api/WorkPlan/Instruction
		[HttpGet, Route("Instruction")]
		public async Task<IEnumerable<DTOWorkInstruction>> GetWorkPlanInstruction()
		{
			return await _service.GetWorkInstruction();
		}

		//GET: api/WorkPlan/Instruction/3
		[Route("Instruction/{id}"), HttpGet]
		public async Task<IEnumerable<int>> GetWorkPlanInstructionID(int id)
		{
			IEnumerable<DTOWorkInstruction> instructions = await _service.GetWorkInstruction();
			List<int> output = new List<int>();
			foreach (DTOWorkInstruction instruction in instructions)
			{
				if(instruction.WorkPlanID == id)
				{
					output.Add(instruction.InstructionID);
				}
			}

			return output;
		}
	}
}
