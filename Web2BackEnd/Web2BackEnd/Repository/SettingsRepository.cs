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
	public class SettingsRepository : ISettingsRepository
	{
		protected readonly DataContext _context;

		public SettingsRepository(DataContext context)
		{
			this._context = context;
		}

		public async Task<Settings> Get(int id)
		{
			return await _context.Settings.FindAsync(id);
		}

		public async Task<int> SaveChanges()
		{
			return await _context.SaveChangesAsync();
		}

		public void Update(Settings model)
		{
			_context.Entry(model).State = EntityState.Modified;
		}
	}
}
