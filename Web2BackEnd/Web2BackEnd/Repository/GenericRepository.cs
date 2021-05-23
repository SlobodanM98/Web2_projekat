using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
	public class GenericRepository<GenericModel> : IGenericRepository<GenericModel> where GenericModel : class
	{
		protected readonly DataContext _context;
		protected readonly DbSet<GenericModel> _dbSet;

		public GenericRepository(DataContext context){
			this._context = context;
			this._dbSet = context.Set<GenericModel>();
		}

		public virtual async Task<IEnumerable<GenericModel>> GetAll(){
			return await _dbSet.ToListAsync();
		}

		public virtual async Task<GenericModel> Get(int id){
			return await _dbSet.FindAsync(id);
		}

		public virtual void Update(GenericModel model){
			_context.Entry(model).State = EntityState.Modified;
		}

		public virtual void Add(GenericModel model){
			_dbSet.Add(model);
		}

		public virtual async Task<GenericModel> Delete(int id){
			GenericModel model = await _dbSet.FindAsync(id);

			if(model != null){
				_dbSet.Remove(model);
			}

			return model;
		}

		public virtual async Task<int> SaveChanges(){
			return await _context.SaveChangesAsync();
		}
	}
}
