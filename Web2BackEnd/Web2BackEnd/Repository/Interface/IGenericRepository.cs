using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository.Interface
{
	public interface IGenericRepository<GenericModel> where GenericModel : class
	{
		Task<IEnumerable<GenericModel>> GetAll();
		Task<GenericModel> Get(int id);
		void Update(GenericModel model);
		void Add(GenericModel model);
		Task<GenericModel> Delete(int id);
		Task<int> SaveChanges();
	}
}
