using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository.Interface
{
	public interface ISettingsRepository
	{
		Task<Settings> Get(int id);
		void Update(Settings model);
		Task<int> SaveChanges();
	}
}
