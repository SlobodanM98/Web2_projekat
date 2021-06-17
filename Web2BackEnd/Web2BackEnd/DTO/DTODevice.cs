using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
    public class DTODevice
    {
       
        public int ID { get; set; }

        public DeviceType Type { get; set; }

        public string Name { get; set; }
        public Address Address { get; set; }
        public float LongCoord { get; set; }
        public float LatCoord { get; set; }
    }
}
