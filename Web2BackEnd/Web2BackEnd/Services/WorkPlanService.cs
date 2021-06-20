using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;
using Web2BackEnd.Services.Interface;

namespace Web2BackEnd.Services
{
	public class WorkPlanService : IWorkPlanService
	{
		private readonly WorkPlanRepository _workPlanRepository;
		private readonly IMapper _mapper;

		public WorkPlanService(DataContext context, IMapper mapper)
		{
			this._workPlanRepository = new WorkPlanRepository(context);
			this._mapper = mapper;
		}

		public async Task<bool> AddWorkInstruction(DTOWorkInstruction workInstruction)
		{
			WorkInstruction mapWorkPlanInstruction = _mapper.Map<WorkInstruction>(workInstruction);
			_workPlanRepository.AddInstruction(mapWorkPlanInstruction);
			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> AddWorkPlan(DTOWorkPlan workPlan)
		{
			WorkPlan mapWorkPlan = _mapper.Map<WorkPlan>(workPlan);
			_workPlanRepository.Add(mapWorkPlan);
			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> AddWorkPlanDevice(DTOWorkPlanDevice workPlanDevice)
		{
			WorkPlanDevice mapWorkPlanDevice = _mapper.Map<WorkPlanDevice>(workPlanDevice);
			_workPlanRepository.AddDevice(mapWorkPlanDevice);
			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> AddWorkPlanImage(DTOWorkPlanImage workPlanImage)
		{
			WorkPlanImage mapWorkPlanImage = _mapper.Map<WorkPlanImage>(workPlanImage);
			_workPlanRepository.AddImage(mapWorkPlanImage);
			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> AddWorkPlanStatusHistory(DTOWorkPlanStatusHistory workPlanStatusHistory)
		{
			WorkPlanStatusHistory mapWorkPlanStatusHistory = _mapper.Map<WorkPlanStatusHistory>(workPlanStatusHistory);
			_workPlanRepository.AddStatusHistory(mapWorkPlanStatusHistory);
			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> DeleteWorkPlan(int id)
		{
			WorkPlan workPlan = await _workPlanRepository.Delete(id);

			if (workPlan == null)
			{
				return false;
			}
			else
			{
				await _workPlanRepository.SaveChanges();
				return true;
			}
		}

		public async Task<IEnumerable<DTOWorkInstruction>> GetWorkInstruction()
		{
			IEnumerable<WorkInstruction> workPlanInstructions = await _workPlanRepository.GetAllInstructions();
			return _mapper.Map<IEnumerable<DTOWorkInstruction>>(workPlanInstructions);
		}

		public async Task<IEnumerable<DTOWorkPlan>> GetWorkPlan()
		{
			IEnumerable<WorkPlan> workPlans = await _workPlanRepository.GetAll();
			return _mapper.Map<IEnumerable<DTOWorkPlan>>(workPlans);
		}

		public async Task<DTOWorkPlan> GetWorkPlan(int id)
		{
			WorkPlan workPlan = await _workPlanRepository.Get(id);
			return _mapper.Map<DTOWorkPlan>(workPlan);
		}

		public async Task<IEnumerable<DTOWorkPlanDevice>> GetWorkPlanDevice()
		{
			IEnumerable<WorkPlanDevice> workPlanDevices = await _workPlanRepository.GetAllDevices();
			return _mapper.Map<IEnumerable<DTOWorkPlanDevice>>(workPlanDevices);
		}

		public async Task<IEnumerable<DTOWorkPlanImage>> GetWorkPlanImage()
		{
			IEnumerable<WorkPlanImage> workPlanImages = await _workPlanRepository.GetAllImages();
			return _mapper.Map<IEnumerable<DTOWorkPlanImage>>(workPlanImages);
		}

		public async Task<IEnumerable<DTOWorkPlanStatusHistory>> GetWorkStatusHistory()
		{
			IEnumerable<WorkPlanStatusHistory> workPlanStatusHistory = await _workPlanRepository.GetAllStatusHistory();
			return _mapper.Map<IEnumerable<DTOWorkPlanStatusHistory>>(workPlanStatusHistory);
		}

		public async Task<bool> UpdateWorkPlan(DTOWorkPlan workPlan)
		{
			WorkPlan mapWorkPlan = _mapper.Map<WorkPlan>(workPlan);
			_workPlanRepository.Update(mapWorkPlan);

			bool success = true;

			try
			{
				await _workPlanRepository.SaveChanges();
			}
			catch
			{
				if (!_workPlanRepository.WorkPlanExists(workPlan.WorkPlanID))
				{
					success = false;
				}
				else
				{
					throw;
				}
			}

			return success;
		}
	}
}
