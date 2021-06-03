using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository
{
	public class CallRepository : GenericRepository<Call>
	{
		public CallRepository(DataContext context) : base(context) { }

		public override void Add(Call model)
		{
			_dbSet.Add(model);
			_context.Entry(model.Address).State = EntityState.Unchanged;
		}

		public override async Task<IEnumerable<Call>> GetAll()
		{
			return await _dbSet.Include("Address").ToListAsync();
		}

		public override async Task<Call> Get(int id)
		{
			return await _dbSet.Include("Address").FirstOrDefaultAsync(call => call.CallID == id);
		}

		public override void Update(Call model)
		{
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
		}

		public bool CallExists(int id)
		{
			return _context.Calls.Any(call => call.CallID == id);
		}
	}
}
