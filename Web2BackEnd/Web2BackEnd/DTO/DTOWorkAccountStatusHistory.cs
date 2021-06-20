using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
    public class DTOWorkAccountStatusHistory
    {
        public int WorkAccountStatusHistoryID { get; set; }
        public DateTime Date { get; set; }
        public string ChangedBy { get; set; }
        public StatusWorkAccount Status { get; set; }
    }
}
