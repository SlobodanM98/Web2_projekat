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
    public class WorkAccountRepository : GenericRepository<WorkAccount>, IWorkAccountRepository
    {
        public WorkAccountRepository(DataContext context) : base(context)
        {
        }

        public bool WorkAccountExists(int id)
        {
            return _context.WorkAccounts.Any(workAccount => workAccount.WorkAccountID == id);
        }

		public override async Task<IEnumerable<WorkAccount>> GetAll()
		{
			return await _dbSet.Include("Address").Include("WorkAccountStatusHistory").ToListAsync();
		}

		//koristi se update2
		public override void Update(WorkAccount model)
		{
			WorkAccount work = _dbSet.Find(model.WorkAccountID);
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
			if (work.WorkAccountStatusHistory == null)
			{
				_context.Entry(model.WorkAccountStatusHistory).State = EntityState.Added;
			}
			else
			{
				_context.Entry(model.WorkAccountStatusHistory).State = EntityState.Modified;
			}
		}

		public async Task<WorkAccount> Update2(WorkAccount model)
        {
			WorkAccount work = await _dbSet.AsNoTracking().FirstOrDefaultAsync(x => x.WorkAccountID == model.WorkAccountID);
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
			if (work.WorkAccountStatusHistory == null)
			{
				_context.Entry(model.WorkAccountStatusHistory).State = EntityState.Added;
			}
			else
			{
				_context.Entry(model.WorkAccountStatusHistory).State = EntityState.Modified;
			}
			return model;
		}

		public override async Task<WorkAccount> Get(int id)
		{
			return await _dbSet.Include("Address").Include("WorkAccountStatusHistory").FirstOrDefaultAsync(workAccount => workAccount.WorkAccountID == id);
		}

		public override void Add(WorkAccount model)
		{
			_dbSet.Add(model);
			_context.Entry(model.Address).State = EntityState.Unchanged;
		}

        public async override Task<WorkAccount> Delete(int id)
        {
			WorkAccount model = await _dbSet.Include("Address").Include("WorkAccountStatusHistory").FirstOrDefaultAsync(x => x.WorkAccountID == id);

			if (model != null)
			{
				WorkAccountStatusHistory history = await _context.WorkAccountStatusHistorys.FindAsync(model.WorkAccountStatusHistory.WorkAccountStatusHistoryID);
				_dbSet.Remove(model);
				if(history != null)
                {
					_context.WorkAccountStatusHistorys.Remove(history);
				}
			}

			return model;
		}
    }
}
