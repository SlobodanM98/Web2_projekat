using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class IncidentDevice
    {
        public int ID { get; set; }
        public int IncidentID { get; set; }
        public int DeviceID { get; set; }

    }
}
