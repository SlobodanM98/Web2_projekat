using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;

namespace Web2BackEnd.Services.Interface
{
    interface ISafetyDocumentService
    {
        Task<IEnumerable<DTOSafetyDocument>> GetSafetyDocument();
        Task<DTOSafetyDocument> GetSafetyDocument(int id);
        Task<bool> UpdateSafetyDocument(DTOSafetyDocument document);
        Task<bool> AddDocument(DTOSafetyDocument document);
        Task<bool> DeleteSafetyDocument(int id);
    }
}
