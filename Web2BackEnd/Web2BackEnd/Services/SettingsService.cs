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
	public class SettingsService : ISettingsService
	{
		private readonly SettingsRepository _settingsRepository;
		private readonly IMapper _mapper;

		public SettingsService(DataContext context, IMapper mapper)
		{
			this._settingsRepository = new SettingsRepository(context);
			this._mapper = mapper;
		}

		public async Task<DTOSettings> GetSettings(int id)
		{
			Settings settings = await _settingsRepository.Get(id);
			return _mapper.Map<DTOSettings>(settings);
		}

		public async Task<bool> UpdateSettings(DTOSettings settings)
		{
			Settings mapSettings = _mapper.Map<Settings>(settings);
			_settingsRepository.Update(mapSettings);

			bool success = true;

			try
			{
				await _settingsRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}
	}
}
