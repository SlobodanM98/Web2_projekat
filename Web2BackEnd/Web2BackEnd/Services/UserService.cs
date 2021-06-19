﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    public class UserService : ControllerBase, IUserService
    {
        private readonly UserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager, IMapper mapper, DataContext context)
        {
            this._userRepository = new UserRepository(userManager, context);
            this._mapper = mapper;
        }

        public async Task<bool> Register(UserForRegistrationDto model)
        {
            User mapUser = _mapper.Map<User>(model);
            try
            {
                var result = await _userRepository.Add(mapUser, model.Password);
                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    return false;
                }

                return true;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

       // public async Task<string> Login(DTOLogin loginInfo)
       /*
        {
          

            




        }
       */
        public async Task<bool> DeleteUser(string id)
        {
            var result = await _userRepository.Delete(id);

            if (result.Errors.Any())
            {
                var test = result.Errors.ToList();
                return false;
            }

            return true;
        }

        public async Task<string> GenerateToken(UserForRegistrationDto model)
        {
            User mapUser = _mapper.Map<User>(model);
            return await _userRepository.GenerateToken(mapUser);
        }

        public async Task<bool> ConfirmeToken(string email, string token)
        {

            var result = await _userRepository.ConfirmeToken(email, token);

            if (result.Errors.Any())
            {
                var test = result.Errors.ToList();
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<UserForRegistrationDto>> GetUsers()
        {
            IEnumerable<User> users = await _userRepository.GetAll();
            return _mapper.Map<IEnumerable<UserForRegistrationDto>>(users);
        }


        public async Task<IEnumerable<UserForRegistrationDto>> GetUsersEmailCofirm()
        {
            IEnumerable<User> users = await _userRepository.GetAll();
            IEnumerable<User> copyUsers = users.Where(u => u.EmailConfirmed == true);
            return _mapper.Map<IEnumerable<UserForRegistrationDto>>(copyUsers);
        }

        public async Task<bool> UpdateStatus(UserForRegistrationDto model)
        {
            User mapUser = _mapper.Map<User>(model);
            _userRepository.Update(mapUser);

            bool success = true;
            User u = await _userRepository.Get(mapUser.Id);
            if (u == null || u.Status != model.Status)
            {
                success = false;
            }
            return success;
        }

		public async Task<UserForRegistrationDto> GetUser(string id)
		{
            User user = await _userRepository.Get(id);
            return _mapper.Map<UserForRegistrationDto>(user);
        }

		public async Task<bool> UpdateUser(UserForRegistrationDto user)
		{
            User mapUser = await _userRepository.Get(user.Id);

            mapUser.UserName = user.UserName;
            mapUser.FirstName = user.FirstName;
            mapUser.LastName = user.LastName;
            mapUser.AddressID = user.AddressID;
            mapUser.Email = user.Email;
            mapUser.BirthDate = user.BirthDate;
            if (user.SelecetdFile != null)
			{
                mapUser.ProductImage = _mapper.Map<ProductImage>(user.ProductImage);
            }
            mapUser.Role = user.Role;
            mapUser.Status = user.Status;

            return await _userRepository.Update(mapUser);
        }

		public async Task<bool> UpdateUserPassword(UserForRegistrationDto user)
		{
			User mapUser = await _userRepository.Get(user.Id);
            return await _userRepository.UpdatePassword(mapUser, user.Password);
        }
	}
}
