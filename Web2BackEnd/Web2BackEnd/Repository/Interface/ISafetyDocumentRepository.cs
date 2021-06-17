using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2BackEnd.Repository.Interface
{
    interface ISafetyDocumentRepository
    {

        bool DocumentExists(int id);
    }
}
