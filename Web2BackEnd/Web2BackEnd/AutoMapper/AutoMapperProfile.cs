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

			CreateMap<UserForRegistrationDto, User>();
			CreateMap<User, UserForRegistrationDto>();
			CreateMap<DTOProductImage, ProductImage>();
			CreateMap<ProductImage ,DTOProductImage>();
			CreateMap<DTOCall, Call>();
			CreateMap<Call, DTOCall>();
			CreateMap<DTONotification, Notification>();
			CreateMap<Notification, DTONotification>();
			CreateMap<DTOSettings, Settings>();
			CreateMap<Settings, DTOSettings>();
			CreateMap<Incident, DTOIncident>();
			CreateMap<DTOIncident, Incident>();
			CreateMap<SafetyDocument, DTOSafetyDocument>();
			CreateMap<DTOSafetyDocument, SafetyDocument>();
			CreateMap<Device, DTODevice>();
			CreateMap<DTODevice, Device>();
			CreateMap<WorkPlan, DTOWorkPlan>();
			CreateMap<DTOWorkPlan, WorkPlan>();
			CreateMap<WorkInstruction, DTOWorkInstruction>();
			CreateMap<DTOWorkInstruction, WorkInstruction>();
			CreateMap<DTOWorkPlanImage, WorkPlanImage>();
			CreateMap<WorkPlanImage, DTOWorkPlanImage>();
			CreateMap<WorkPlanStatusHistory, DTOWorkPlanStatusHistory>();
			CreateMap<DTOWorkPlanStatusHistory, WorkPlanStatusHistory>();
			CreateMap<DTOWorkPlanDevice, WorkPlanDevice>();
			CreateMap<WorkPlanDevice, DTOWorkPlanDevice>();

			CreateMap<Team, DTOTeam>();
			CreateMap<DTOTeam, Team>();
			CreateMap<TeamUser, DTOTeamUser>();
			CreateMap<DTOTeamUser, TeamUser>();

			CreateMap<IncidentCall, DTOIncident>();
			CreateMap<DTOIncidentCall, IncidentCall>();
			CreateMap<IncidentDevice, DTOIncidentDevice>();
			CreateMap<DTOIncidentDevice, IncidentDevice>();

			CreateMap<WorkAccount, DTOWorkAccount>();
			CreateMap<DTOWorkAccount, WorkAccount>();
			CreateMap<WorkAccountStatusHistory, DTOWorkAccountStatusHistory>();
			CreateMap<DTOWorkAccountStatusHistory, WorkAccountStatusHistory>();
			CreateMap<WorkAccountImage, DTOWorkAccountImage>();
			CreateMap<DTOWorkAccountImage, WorkAccountImage>();
		}
	}
}
