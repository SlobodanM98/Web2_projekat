using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;
using Web2BackEnd.Services.Interface;

namespace Web2BackEnd.Services
{
    public class SafetyDocumentService : ISafetyDocumentService
    {

        private readonly SafetyDocumentRepository _documentRepository;
        private readonly IMapper _mapper;

        public SafetyDocumentService(DataContext context, IMapper mapper)
        {
            this._documentRepository = new SafetyDocumentRepository(context);
            this._mapper = mapper;
        }

        public async Task<bool> AddDocument(DTOSafetyDocument document)
        {
            SafetyDocument mapDocument = _mapper.Map<SafetyDocument>(document);
            _documentRepository.Add(mapDocument);
            bool success = true;

            try
            {
                await _documentRepository.SaveChanges();
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public Task<bool> DeleteSafetyDocument(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<DTOSafetyDocument> GetSafetyDocument(int id)
        {
            SafetyDocument document = await _documentRepository.Get(id);
            return _mapper.Map<DTOSafetyDocument>(document);
        }

        public async Task<IEnumerable<DTOSafetyDocument>> GetSafetyDocument()
        {
            IEnumerable<SafetyDocument> documents = await _documentRepository.GetAll();
            return _mapper.Map<IEnumerable<DTOSafetyDocument>>(documents);
        }

        public Task<bool> UpdateSafetyDocument(DTOSafetyDocument call)
        {
            throw new NotImplementedException();
        }
    }
}
