using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;
using Web2BackEnd.Repository.Interface;

namespace Web2BackEnd.Repository
{
    public class SafetyDocumentRepository : GenericRepository<SafetyDocument>, ISafetyDocumentRepository
    {
        public SafetyDocumentRepository(DataContext context) : base(context)
        {

        }

        public bool DocumentExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
