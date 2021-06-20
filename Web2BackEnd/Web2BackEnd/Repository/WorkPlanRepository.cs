using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
	public class WorkPlanRepository : GenericRepository<WorkPlan>, IWorkPlanRepository
	{
		public WorkPlanRepository(DataContext context) : base(context) { }

		public bool WorkPlanExists(int id)
		{
			return _context.WorkPlans.Any(workPlan => workPlan.WorkPlanID == id);
		}

		public override async Task<IEnumerable<WorkPlan>> GetAll()
		{
			return await _dbSet.Include("Address").ToListAsync();
		}

		public override void Update(WorkPlan model)
		{
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
		}

		public override async Task<WorkPlan> Get(int id)
		{
			return await _dbSet.Include("Address").FirstOrDefaultAsync(workPlan => workPlan.WorkPlanID == id);
		}

		public override void Add(WorkPlan model)
		{
			_dbSet.Add(model);
			_context.Entry(model.Address).State = EntityState.Unchanged;
		}

		public void AddImage(WorkPlanImage workPlanImage)
		{
			_context.WorkPlanImages.Add(workPlanImage);
			_context.Entry(workPlanImage.WorkPlan).State = EntityState.Unchanged;
		}

		public void AddInstruction(WorkInstruction workInstruction)
		{
			_context.WorkPlanInstructions.Add(workInstruction);
			_context.Entry(workInstruction.Device).State = EntityState.Unchanged;
		}

		public void AddDevice(WorkPlanDevice workPlanDevice)
		{
			_context.WorkPlanDevice.Add(workPlanDevice);
			_context.Entry(workPlanDevice.Device).State = EntityState.Unchanged;
		}

		public async Task<IEnumerable<WorkPlanDevice>> GetAllDevices()
		{
			return await _context.WorkPlanDevice.Include("Device").ToListAsync();
		}

		public async Task<IEnumerable<WorkPlanImage>> GetAllImages()
		{
			return await _context.WorkPlanImages.Include("WorkPlan").ToListAsync();
		}

		public async Task<IEnumerable<WorkInstruction>> GetAllInstructions()
		{
			return await _context.WorkPlanInstructions.Include("Device").ToListAsync();
		}

		public void AddStatusHistory(WorkPlanStatusHistory workPlanStatusHistory)
		{
			_context.WorkPlanStatusHistories.Add(workPlanStatusHistory);
		}

		public async Task<IEnumerable<WorkPlanStatusHistory>> GetAllStatusHistory()
		{
			return await _context.WorkPlanStatusHistories.ToListAsync();
		}
	}
}
