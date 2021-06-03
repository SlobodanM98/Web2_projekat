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
	public class CallService : ICallService
	{
		private readonly CallRepository _callRepository;
		private readonly IMapper _mapper;

		public CallService(DataContext context, IMapper mapper)
		{
			this._callRepository = new CallRepository(context);
			this._mapper = mapper;
		}

		public async Task<bool> AddCall(DTOCall call)
		{
			Call mapCall = _mapper.Map<Call>(call);
			_callRepository.Add(mapCall);
			bool success = true;

			try
			{
				await _callRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> DeleteCall(int id)
		{
			Call call = await _callRepository.Delete(id);

			if (call == null)
			{
				return false;
			}
			else
			{
				await _callRepository.SaveChanges();
				return true;
			}
		}

		public async Task<IEnumerable<DTOCall>> GetCall()
		{
			IEnumerable<Call> calls = await _callRepository.GetAll();
			return _mapper.Map<IEnumerable<DTOCall>>(calls);
		}

		public async Task<DTOCall> GetCall(int id)
		{
			Call call = await _callRepository.Get(id);
			return _mapper.Map<DTOCall>(call);
		}

		public async Task<bool> UpdateCall(DTOCall call)
		{
			Call mapCall = _mapper.Map<Call>(call);
			_callRepository.Update(mapCall);

			bool success = true;

			try
			{
				await _callRepository.SaveChanges();
			}
			catch
			{
				if (!_callRepository.CallExists(call.CallID))
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
	}
}
