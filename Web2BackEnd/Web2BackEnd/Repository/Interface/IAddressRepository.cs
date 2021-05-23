using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Repository.Interface
{
	public interface IAddressRepository
	{
		bool AddressExists(int id);
	}
}
