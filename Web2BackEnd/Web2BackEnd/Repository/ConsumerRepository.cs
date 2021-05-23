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
	public class ConsumerRepository : GenericRepository<Consumer>, IConsumerRepository
	{
		public ConsumerRepository(DataContext context) : base(context)
		{
		}

		public bool ConsumerExists(int id)
		{
			return _context.Consumers.Any(consumer => consumer.ConsumerID == id);
		}

		public override async Task<IEnumerable<Consumer>> GetAll(){
			return await _dbSet.Include("Address").ToListAsync();
		}

		public override void Update(Consumer model)
		{
			_context.Entry(model).State = EntityState.Modified;
			_context.Entry(model.Address).State = EntityState.Modified;
		}

		public override async Task<Consumer> Get(int id)
		{
			return await _dbSet.Include("Address").FirstOrDefaultAsync(consumer => consumer.ConsumerID == id);
		}

		public override void Add(Consumer model)
		{
			_dbSet.Add(model);
			_context.Entry(model.Address).State = EntityState.Unchanged;
		}
	}
}
