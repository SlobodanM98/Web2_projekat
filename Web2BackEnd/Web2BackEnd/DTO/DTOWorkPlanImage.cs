﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
	public class DTOWorkPlanImage
	{
		public int ID { get; set; }
		public string ImagePath { get; set; }
		public byte[] Image { get; set; }
		public WorkPlan WorkPlan { get; set; }
	}
}
