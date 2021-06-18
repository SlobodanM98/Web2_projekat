using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.DTO
{
    public class DTOTeam
    {
        public int TeamID { get; set; }

        public string Name { get; set; }

        public IEnumerable<DTOTeamUser> TeamUsers { get; set; }
    }
}
