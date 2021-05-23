using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
	public class DTOAddress
	{
		public int AddressID { get; set; }
		public string Street { get; set; }
		public int Number { get; set; }
		public string City { get; set; }
		public int PostalNumber { get; set; }
		public int Priority { get; set; }
	}
}
