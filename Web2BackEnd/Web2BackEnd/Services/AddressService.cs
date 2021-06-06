using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
	public class AddressService : IAddressService
	{
		private readonly AddressRepository _addressRepository;
		private readonly IMapper _mapper;

		public AddressService(DataContext context, IMapper mapper){
			this._addressRepository = new AddressRepository(context);
			this._mapper = mapper;
		}

		public async Task<IEnumerable<DTOAddress>> GetAddress()
		{
			IEnumerable<Address> addresses = await _addressRepository.GetAll();
			return _mapper.Map<IEnumerable<DTOAddress>>(addresses);
		}

		public async Task<DTOAddress> GetAddress(int id)
		{
			Address address = await _addressRepository.Get(id);
			return _mapper.Map<DTOAddress>(address);
		}

		public async Task<bool> UpdateAddress(DTOAddress address)
		{
			Address mapAddress = _mapper.Map<Address>(address);
			_addressRepository.Update(mapAddress);

			bool success = true;

			try
			{
				await _addressRepository.SaveChanges();
			}
			catch
			{
				if (!_addressRepository.AddressExists(address.AddressID))
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

		public async Task<bool> AddAddress(DTOAddress address)
		{
			Address mapAddress = _mapper.Map<Address>(address);
			_addressRepository.Add(mapAddress);
			bool success = true;

			try
			{
				await _addressRepository.SaveChanges();
			}
			catch(Exception e)
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> DeleteAddress(int id)
		{
			Address address = await _addressRepository.Delete(id);

			if(address == null)
			{
				return false;
			}
			else
			{
				await _addressRepository.SaveChanges();
				return true;
			}
		}
	}
}
