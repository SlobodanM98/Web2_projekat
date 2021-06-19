using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository.Interface
{
	public interface IWorkPlanRepository
	{
		bool WorkPlanExists(int id);
		void AddImage(WorkPlanImage workPlanImage);
		void AddInstruction(WorkInstruction workInstruction);
		void AddDevice(WorkPlanDevice workPlanDevice);
		Task<IEnumerable<WorkPlanDevice>> GetAllDevices();
		Task<IEnumerable<WorkPlanImage>> GetAllImages();
		Task<IEnumerable<WorkInstruction>> GetAllInstructions();
	}
}
