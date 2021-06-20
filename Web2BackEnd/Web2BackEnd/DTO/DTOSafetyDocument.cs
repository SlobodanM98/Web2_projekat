﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
    public class DTOSafetyDocument
    {
        
        public int ID { get; set; }
        
        public TipDokumenta tipDokumenta { get; set; }
        
        public string PlanRada { get; set; }
        
        public string Author { get; set; }
        
        public string Team { get; set; }
        
        public string Details { get; set; }
        
        public string Notes { get; set; }
        
        public string PhoneNum { get; set; }
        
        public string DateOfCreation { get; set; }
    }
}