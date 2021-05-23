using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
	public class AddressRepository : GenericRepository<Address>, IAddressRepository
	{
		public AddressRepository(DataContext context) : base(context)
		{
		}

		public bool AddressExists(int id)
		{
			return _context.Addresses.Any(address => address.AddressID == id);
		}
	}
}
