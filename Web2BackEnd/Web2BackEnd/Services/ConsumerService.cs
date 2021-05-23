using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
	public class ConsumerService : IConsumerService
	{
		private readonly ConsumerRepository _consumerRepository;
		private readonly IMapper _mapper;

		public ConsumerService(DataContext context, IMapper mapper)
		{
			this._consumerRepository = new ConsumerRepository(context);
			this._mapper = mapper;
		}

		public async Task<IEnumerable<DTOConsumer>> GetConsumer()
		{
			IEnumerable<Consumer> consumers = await _consumerRepository.GetAll();
			return _mapper.Map<IEnumerable<DTOConsumer>>(consumers);
		}

		public async Task<DTOConsumer> GetConsumer(int id)
		{
			Consumer consumer = await _consumerRepository.Get(id);
			return _mapper.Map<DTOConsumer>(consumer);
		}

		public async Task<bool> UpdateConsumer(DTOConsumer consumer)
		{
			Consumer mapConsumer = _mapper.Map<Consumer>(consumer);
			_consumerRepository.Update(mapConsumer);

			bool success = true;

			try
			{
				await _consumerRepository.SaveChanges();
			}
			catch
			{
				if (!_consumerRepository.ConsumerExists(consumer.ConsumerID))
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

		public async Task<bool> AddConsumer(DTOConsumer consumer)
		{
			Consumer mapConsumer = _mapper.Map<Consumer>(consumer);
			_consumerRepository.Add(mapConsumer);
			bool success = true;

			try
			{
				await _consumerRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> DeleteConsumer(int id)
		{
			Consumer consumer = await _consumerRepository.Delete(id);

			if (consumer == null)
			{
				return false;
			}
			else
			{
				await _consumerRepository.SaveChanges();
				return true;
			}
		}
	}
}
