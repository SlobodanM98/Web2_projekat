﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Web2BackEnd.Data;
using Web2BackEnd.DTO;
using Web2BackEnd.Helper;
using Web2BackEnd.Models;
using Web2BackEnd.Services;

namespace Web2BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserService _service;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager, IMapper mapper, DataContext context)
        {
            _service = new UserService(userManager, mapper, context);
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<Object> Register([FromForm]UserForRegistrationDto model)
        {
            model.SelecetdFile = Request.Form.Files[0];
                if (model.SelecetdFile != null)
            {
                var folderName = Path.Combine("StaticFiles", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (model.SelecetdFile.Length > 0)
                {
                    var objfiles = new DTOProductImage();
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, model.SelecetdFile.FileName);
                    var dbPath = Path.Combine(folderName, model.SelecetdFile.FileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        model.SelecetdFile.CopyTo(stream);
                    }

                    using (var target = new MemoryStream())
                    {
                        model.SelecetdFile.CopyTo(target);
                        objfiles.Image = target.ToArray();
                    }

                    model.Image = objfiles;
                    model.Image.ImagePath = dbPath;
                }
            }
            User mapUser = _mapper.Map<User>(model);
            mapUser.Id = System.Guid.NewGuid().ToString();
            mapUser.AdminConfirme = false;
            bool success = false;
            try
            {
                var result = await _userManager.CreateAsync(mapUser, model.Password);
                if (result.Errors.Any())
                {
                    var test = result.Errors.ToList();
                    success = false;
                }
                else
                {
                    success = true;
                }
            }
            catch (Exception e)
            {
                throw e;
            }// bool success =  await _service.Register(model);

            if (success)
            {

                string token = await _userManager.GenerateEmailConfirmationTokenAsync(mapUser);
                var confirmationLink = Url.Action("ConfirmEmail", "User", new { email = model.Email, token = HttpUtility.UrlEncode(token)  }, Request.Scheme);

                EmailHelper emailHelper = new EmailHelper();
                bool emailResponse = emailHelper.SendEmail(model.Email, confirmationLink);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost, Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromForm]DTOLogin loginInfo)
        {
            User user = await _userManager.FindByNameAsync(loginInfo.Username);
            
            if (user != null && await _userManager.CheckPasswordAsync(user, loginInfo.Password))
            {
                var token = generateJwtToken(user);
                return Ok( new { token });
            }
            else
            {
                return BadRequest(new { message = "Incorect Password!" });
            }
            

           
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var key = Encoding.UTF8.GetBytes("9182019287192163");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("role", user.Role.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }




        [HttpDelete, Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            bool success = await _service.DeleteUser(id);

            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }


        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest();
            var t = HttpUtility.UrlDecode(token);
            var result = await _userManager.ConfirmEmailAsync(user, t);
            return Ok();
            /*if(result == true)
            {
                return Ok();
            }
            return BadRequest();*/
        }

        [HttpGet]
        public async Task<IEnumerable<UserForRegistrationDto>> GetUser()
        {
            return await _service.GetUsers();
        }
    }
}
