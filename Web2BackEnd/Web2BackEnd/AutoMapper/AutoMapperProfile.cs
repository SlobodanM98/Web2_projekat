using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2BackEnd.DTO;
using Web2BackEnd.Models;

namespace Web2BackEnd.AutoMapper
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile(){
			CreateMap<DTOAddress, Address>();
			CreateMap<Address, DTOAddress>();
			CreateMap<DTOConsumer, Consumer>();
			CreateMap<Consumer, DTOConsumer>();
			CreateMap<DTOCall, Call>();
			CreateMap<Call, DTOCall>();
		}
	}
}
