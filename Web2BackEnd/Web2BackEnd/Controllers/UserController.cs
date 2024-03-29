﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V3.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        private AppSettings _appSettings;

        public UserController(UserManager<User> userManager, IMapper mapper, DataContext context, IOptions<AppSettings> appSettings)
        {
            _service = new UserService(userManager, mapper, context);
            _userManager = userManager;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        public async Task<Object> Register([FromForm]UserForRegistrationDto model)
        {
            model.SelecetdFile = Request.Form.Files[0];
            if (model.SelecetdFile != null)
            {
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (model.SelecetdFile.Length > 0)
                {
                    var objfiles = new DTOProductImage();
                    //var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, model.SelecetdFile.FileName);
                    var dbPath = Path.Combine("Images", model.SelecetdFile.FileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        model.SelecetdFile.CopyTo(stream);
                    }

                    using (var target = new MemoryStream())
                    {
                        model.SelecetdFile.CopyTo(target);
                        objfiles.Image = target.ToArray();
                    }

                    model.ProductImage = objfiles;
                    model.ProductImage.ImagePath = dbPath;
                }
            }
            User mapUser = _mapper.Map<User>(model);
            mapUser.Id = System.Guid.NewGuid().ToString();
            mapUser.Status = Status.Processing;
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
            
            var key = Encoding.UTF8.GetBytes(_appSettings.JWT_Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("fullName", user.FirstName + " " + user.LastName), new Claim("username", user.UserName), new Claim("role", user.Role.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromForm] UserForRegistrationDto user)
        {
            if (Request.Form.Files.Count != 0)
			{
                user.SelecetdFile = Request.Form.Files[0];
			}
			else
			{
                user.SelecetdFile = null;
            }

            if (user.SelecetdFile != null)
            {
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (user.SelecetdFile.Length > 0)
                {
                    var objfiles = new DTOProductImage();
                    var fullPath = Path.Combine(pathToSave, user.SelecetdFile.FileName);
                    var dbPath = Path.Combine("Images", user.SelecetdFile.FileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        user.SelecetdFile.CopyTo(stream);
                    }

                    using (var target = new MemoryStream())
                    {
                        user.SelecetdFile.CopyTo(target);
                        objfiles.Image = target.ToArray();
                    }

                    user.ProductImage = objfiles;
                    user.ProductImage.ImagePath = dbPath;
                }
            }

			try
			{
                bool success = await _service.UpdateUser(user);
                if (success)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
			catch
			{
                return NotFound();
            }
        }

        [HttpPut, Route("Password")]
        public async Task<IActionResult> UpdateUserPassword([FromForm] UserForRegistrationDto user)
		{
			try
			{
                if(await _service.UpdateUserPassword(user))
				{
                    return Ok();
				}
				else
				{
                    return NotFound();
				}
			}
			catch
			{
                return NotFound();
			}
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

        [HttpGet, Route("ConfirmEmail")]
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

        [HttpGet("{id}")]
        public async Task<ActionResult<UserForRegistrationDto>> GetUser(string id)
        {
            UserForRegistrationDto user = await _service.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet, Route("GetUsersEmailConfirm")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IEnumerable<UserForRegistrationDto>> GetUsersEmailConfirm()
        {
            string role = User.Claims.First(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value;
            return await _service.GetUsersEmailCofirm();
        }

        [HttpGet, Route("GetUsersTeamMembers")]
        public async Task<IEnumerable<UserForRegistrationDto>> GetUsersTeamMembers()
        {
            return await _service.GetUsersTeamMembers();
        }

        [HttpPut, Route("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus(UserForRegistrationDto user)
        {
            User copy = await _userManager.FindByIdAsync(user.Id);
            copy.Status = user.Status;
            await _userManager.UpdateAsync(copy);

            bool success = true;
            User u = await _userManager.FindByIdAsync(user.Id);
            if (u == null || u.Status != user.Status)
            {
                return NotFound();
            }
            return Ok();
        }


        [HttpPost, Route("SocialLogin")]
        public async Task<IActionResult> SocialLogin([FromBody]LoginModel loginModel)
        {
            //if(VerifyToken(loginModel.Id))
            return Ok();
        }

        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var reqUri = new Uri(string.Format("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}", providerToken));
            HttpResponseMessage httpResponseMessage;
            try
            {
                httpResponseMessage = httpClient.GetAsync(reqUri).Result;
            }
            catch(Exception e)
            {
                return false;
            }

            if(httpResponseMessage.StatusCode == HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            //var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>

            return true;
        }
    }
}
