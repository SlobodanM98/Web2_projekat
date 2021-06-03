using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOCall
	{
		public int CallID { get; set; }
		public Reason Reason { get; set; }
		public string Comment { get; set; }
		public int Priority { get; set; }
		public Address Address { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}
