using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
	public interface IWorkPlanService
	{
		Task<IEnumerable<DTOWorkPlan>> GetWorkPlan();
		Task<IEnumerable<DTOWorkPlanDevice>> GetWorkPlanDevice();
		Task<IEnumerable<DTOWorkPlanImage>> GetWorkPlanImage();
		Task<IEnumerable<DTOWorkInstruction>> GetWorkInstruction();
		Task<DTOWorkPlan> GetWorkPlan(int id);
		Task<bool> UpdateWorkPlan(DTOWorkPlan workPlan);
		Task<bool> AddWorkPlan(DTOWorkPlan workPlan);
		Task<bool> AddWorkPlanImage(DTOWorkPlanImage workPlanImage);
		Task<bool> AddWorkInstruction(DTOWorkInstruction workInstruction);
		Task<bool> AddWorkPlanDevice(DTOWorkPlanDevice workPlanDevice);
		Task<bool> DeleteWorkPlan(int id);
	}
}
