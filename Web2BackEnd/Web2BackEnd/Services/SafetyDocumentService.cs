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

        public async Task<bool> DeleteSafetyDocument(int id)
        {
            
                SafetyDocument doc = await _documentRepository.Delete(id);

                if (doc == null)
                {
                    return false;
                }
                else
                {
                    await _documentRepository.SaveChanges();
                    return true;
                }
            
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

        public async Task<bool> UpdateSafetyDocument(DTOSafetyDocument doc)
        {
            SafetyDocument mapDoc = _mapper.Map<SafetyDocument>(doc);
            _documentRepository.Update(mapDoc);

            bool success = true;

            try
            {
                await _documentRepository.SaveChanges();
            }
            catch
            {
                if (!_documentRepository.DocumentExists(doc.ID))
                {
                    success = false;
                }
                else
                {
                    throw;
                }
            }

            return success;
        }

        public async Task<bool> AddDocumentImage(DTODocumentImage documentImage)
        {
            DocumentImage mapDocumentImage = _mapper.Map<DocumentImage>(documentImage);
            _documentRepository.AddImage(mapDocumentImage);
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

        public async Task<IEnumerable<DTODocumentImage>> GetDocumentImage()
        {
            IEnumerable<DocumentImage> documentImages = await _documentRepository.GetAllImages();
            return _mapper.Map<IEnumerable<DTODocumentImage>>(documentImages);
        }
    }
    
}
