using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
	public class DTOSettings
	{
		public int settingsID { get; set; }
		public bool successEnabled { get; set; }
		public bool errorEnabled { get; set; }
		public bool infoEnabled { get; set; }
		public bool warningEnabled { get; set; }
		public bool showFields { get; set; }
	}
}
