using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;
using Web2BackEnd.Repository;

namespace Web2BackEnd.Services
{
    public class DocumentDeviceService
    {

        private readonly DocumentDeviceRepository _repository;
        private readonly IMapper _mapper;

        public DocumentDeviceService(DataContext context, IMapper mapper)
        {
            this._repository = new DocumentDeviceRepository(context);
            this._mapper = mapper;

        }

        public async Task<bool> AddDocumentDevice(DTODocumentDevice incdev)
        {
            bool success = true;


            DocumentDevice mapIncidentCall = _mapper.Map<DocumentDevice>(incdev);
            _repository.Add(mapIncidentCall);

            try
            {
                await _repository.SaveChanges();
            }
            catch
            {
                success = false;
            }
            return success;
        }

        public async Task<IEnumerable<DTODocumentDevice>> GetDocumentDevice()
        {

            IEnumerable<DocumentDevice> devices = await _repository.GetAll();
            return _mapper.Map<IEnumerable<DTODocumentDevice>>(devices);
        }
    }
}
