using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOConsumer
	{
		public int ConsumerID { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DTOAddress Address { get; set; }
		public int PhoneNumber { get; set; }
		public Models.Type Type { get; set; }
		public int Priority { get; set; }
	}
}
