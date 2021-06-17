using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.Data;
using Web2BackEnd.Models;

namespace Web2BackEnd.Repository
{
    public class UserRepository
    {
        private readonly UserManager<User> _userManager;
        
        public UserRepository(UserManager<User> userManager, DataContext context)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> Add(User user, string password)
        {
            //var UserManager = new UserManager<User>(new UserStore<User>(_context));
            //var result = UserManager.Create(user, password);
            var result =  await _userManager.CreateAsync(user, password);
            return result;
        }

        public async Task<User> Get(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<User> GetByUsername(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<IdentityResult> Delete(string id)
        {
            User user = await Get(id);
            return await _userManager.DeleteAsync(user);
        }

        public UserManager<User> GetUserManager()
        {
            return _userManager;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userManager.Users.Include("ProductImage").ToListAsync();
        }

        public async Task<string> GenerateToken(User user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<IdentityResult> ConfirmeToken(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
                return await _userManager.ConfirmEmailAsync(user, token);
            return IdentityResult.Failed();
        }


        public async void Update(User user)
        {
            //User copy = await Get(user.Id);
            //copy.Status = user.Status;
            await _userManager.UpdateAsync(user);
        }
    }
}
