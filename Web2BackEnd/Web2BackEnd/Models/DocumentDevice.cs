using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Models
{
    public class DocumentDevice : GenericModel
    {

        public int ID { get; set; }
        public int DocumentID { get; set; }
        public int DeviceID { get; set; }
    }
}
