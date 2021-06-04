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
	public class NotificationService : INotificationService
	{
		private readonly NotificationRepository _notificationRepository;
		private readonly IMapper _mapper;

		public NotificationService(DataContext context, IMapper mapper)
		{
			this._notificationRepository = new NotificationRepository(context);
			this._mapper = mapper;
		}

		public async Task<bool> AddNotification(DTONotification notification)
		{
			Notification mapNotification = _mapper.Map<Notification>(notification);
			_notificationRepository.Add(mapNotification);
			bool success = true;

			try
			{
				await _notificationRepository.SaveChanges();
			}
			catch
			{
				success = false;
			}

			return success;
		}

		public async Task<bool> DeleteNotification(int id)
		{
			Notification notification = await _notificationRepository.Delete(id);

			if (notification == null)
			{
				return false;
			}
			else
			{
				await _notificationRepository.SaveChanges();
				return true;
			}
		}

		public async Task<IEnumerable<DTONotification>> GetNotification()
		{
			IEnumerable<Notification> notifications = await _notificationRepository.GetAll();
			return _mapper.Map<IEnumerable<DTONotification>>(notifications);
		}

		public async Task<DTONotification> GetNotification(int id)
		{
			Notification notification = await _notificationRepository.Get(id);
			return _mapper.Map<DTONotification>(notification);
		}

		public async Task<bool> UpdateNotification(DTONotification notification)
		{
			Notification mapNotification = _mapper.Map<Notification>(notification);
			_notificationRepository.Update(mapNotification);

			bool success = true;

			try
			{
				await _notificationRepository.SaveChanges();
			}
			catch
			{
				if (!_notificationRepository.NotificationExists(notification.NotificationID))
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
