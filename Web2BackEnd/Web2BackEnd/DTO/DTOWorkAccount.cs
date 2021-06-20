using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Models;

namespace Web2BackEnd.DTO
{
    public class DTOWorkAccount
    {
        public int WorkAccountID { get; set; }
        public TypeWorkAccount Type { get; set; }
        public StatusWorkAccount Status { get; set; }
        public int IncidentID { get; set; }
        public DTOAddress Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Created { get; set; }
        public DateTime CreationDate { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public bool UrgentWork { get; set; }
        public string Company { get; set; }
        public string PhoneNumber { get; set; }

        public DTOWorkAccountStatusHistory WorkAccountStatusHistory { get; set; }

        //public IEnumerable<DTOWorkAccountImage> WorkAccountImage { get; set; }
    }
}
