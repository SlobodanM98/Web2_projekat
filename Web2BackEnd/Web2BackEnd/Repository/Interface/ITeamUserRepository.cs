using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Repository.Interface
{
    public interface ITeamUserRepository
    {
        bool TeamUserExists(int id);
    }
}
