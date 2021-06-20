import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewAllProfilesComponent } from './components/view-all-profiles/view-all-profiles.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsComponent} from "./components/notifications/notifications.component";
import { WorkPlanComponent } from "./components/work-plan/work-plan.component";
import { WorkPlanFilteredComponent} from "./components/work-plan/work-plan-filtered/work-plan-filtered.component";
import { WorkPlanNewComponent} from "./components/work-plan/work-plan-new/work-plan-new.component";
import { WorkPlanBasicInfoComponent} from "./components/work-plan/work-plan-new/work-plan-basic-info/work-plan-basic-info.component";
import { ConsumersComponent} from "./components/consumers/consumers.component";
import { ConsumersFilteredComponent} from "./components/consumers/consumers-filtered/consumers-filtered.component"
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsFilteredComponent} from './components/documents/documents-filtered/documents-filtered.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { IncidentsNewComponent } from './components/incidents/incidents-new/incidents-new.component';
import { IncidentsFilteredComponent } from './components/incidents/incidents-filtered/incidents-filtered.component';
import { IncidentsBasicInfoComponent } from './components/incidents/incidents-new/incidents-basic-info/incidents-basic-info.component';
import { AddingTeamsComponent } from './components/adding-teams/adding-teams.component';
import { AddingTeamsNewComponent } from './components/adding-teams/adding-teams-new/adding-teams-new.component';
import { WorkAccountComponent } from "./components/work-account/work-account.component";
import { WorkAccountFilteredComponent } from "./components/work-account/work-account-filtered/work-account-filtered.component";
import { WorkAccountNewComponent } from "./components/work-account/work-account-new/work-account-new.component";
import { WorkAccountBasicInfoComponent } from "./components/work-account/work-account-new/work-account-basic-info/work-account-basic-info.component"
import { MapComponent } from "./components/map/map.component"
import { DevicesComponent } from "./components/devices/devices.component"
import { DevicesFilteredComponent } from "./components/devices/devices-filtered/devices-filtered.component"
import { SettingsComponent } from './components/settings/settings.component';
import { WorkAccountHistoryStateChangesComponent } from './components/work-account/work-account-new/work-account-history-state-changes/work-account-history-state-changes.component';
import { WorkAccountMultimediaComponent } from './components/work-account/work-account-new/work-account-multimedia/work-account-multimedia.component'
import { AddToProceedGuard } from './guards/add-to-proceed.guard';
import { WorkPlanMultimediaComponent } from './components/work-plan/work-plan-new/work-plan-multimedia/work-plan-multimedia.component';
import { NoReturnGuard } from './guards/no-return.guard';
import { WorkPlanDevicesComponent } from './components/work-plan/work-plan-new/work-plan-devices/work-plan-devices.component';
import { WorkPlanInstructionsComponent } from './components/work-plan/work-plan-new/work-plan-instructions/work-plan-instructions.component';
import { DocumentsNewComponent } from './components/documents/documents-new/documents-new.component';
import { DocumentsBasicInfoComponent } from './components/documents/documents-new/documents-basic-info/documents-basic-info.component';
import { IncidentDevicesComponent } from './components/incidents/incidents-new/incident-devices/incident-devices.component';
import { IncidentsResolutionComponent } from './components/incidents/incidents-new/incidents-resolution/incidents-resolution.component';
import { IncidentsCallsComponent } from './components/incidents/incidents-new/incidents-calls/incidents-calls.component';
import { NewCallComponent } from './components/incidents/incidents-new/incidents-calls/new-call/new-call.component';
import { MultimediaAttachmentsComponent } from './components/incidents/incidents-new/multimedia-attachments/multimedia-attachments.component';
import { DocumentsChecklistComponent } from './components/documents/documents-new/documents-checklist/documents-checklist.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { WorkPlanViewComponent } from './components/work-plan/work-plan-view/work-plan-view.component';
import { WorkPlanBasicInfoViewComponent } from './components/work-plan/work-plan-view/work-plan-basic-info-view/work-plan-basic-info-view.component';
import { WorkPlanMultimediaViewComponent } from './components/work-plan/work-plan-view/work-plan-multimedia-view/work-plan-multimedia-view.component';
import { WorkPlanDeviceViewComponent } from './components/work-plan/work-plan-view/work-plan-device-view/work-plan-device-view.component';
import { WorkPlanInstructionViewComponent } from './components/work-plan/work-plan-view/work-plan-instruction-view/work-plan-instruction-view.component';
import { WorkPlanHistoryViewComponent } from './components/work-plan/work-plan-view/work-plan-history-view/work-plan-history-view.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch:'full' },
  { path: 'Register', component: RegisterComponent },
  
  { path: 'Navbar', component: NavbarComponent, canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'Incidents', component:IncidentsComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
      children:
      [
        {path:'IncidentsFilteded', component:IncidentsFilteredComponent}
      ]},
      { path :'Documents', component:DocumentsComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
      children:[
        { path:'DocumentsFiltered', component:DocumentsFilteredComponent}
      ]},
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent , canActivate:[RoleGuard], data: { role: 'Consumer'}},
      { path: 'ViewAllProfiles', component: ViewAllProfilesComponent , canActivate:[RoleGuard], data: { role: 'Consumer'}},
      { path: 'Notifications', component: NotificationsComponent, canActivate:[RoleGuard], data: { role: 'Consumer'}},
      { path: 'Devices', component:DevicesComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
      children:
      [
        {path:'DevicesFiltered', component:DevicesFilteredComponent}
      ]},
      { path: 'WorkPlan', component: WorkPlanComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
         { path: 'WorkPlanFiltered', component: WorkPlanFilteredComponent}
       ]},
      {
        path:'DocumentNew', component:DocumentsNewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
        children: [
          { path:'DocumentBasicInfo', component:DocumentsBasicInfoComponent},
          { path:'DocumentChecklist', component:DocumentsChecklistComponent},
        ],
      },
      
      { path:'NewIncident', component:IncidentsNewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
         { path:'IncidentBasicInfo', component:IncidentsBasicInfoComponent},
         { path: 'IncidentDevices', component:IncidentDevicesComponent},
         { path: 'IncidentResolution', component:IncidentsResolutionComponent},
         { path:'IncidentMultimedia', component:MultimediaAttachmentsComponent},
         { path: 'IncidentCalls', component:IncidentsCallsComponent, 
              children:[
                {path:'IncidentCallsNew', component:NewCallComponent}
              ]
        },
       ]},
      { path: 'WorkPlanNew', component: WorkPlanNewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
         { path: 'WorkPlanBasicInfo', component: WorkPlanBasicInfoComponent, canActivate:[NoReturnGuard]},
         { path: 'WorkPlanMultimedia', component: WorkPlanMultimediaComponent, canActivate:[AddToProceedGuard]},
         { path: 'WorkPlanDevices', component: WorkPlanDevicesComponent, canActivate:[AddToProceedGuard]},
         { path: 'WorkPlanInstruction', component: WorkPlanInstructionsComponent, canActivate:[AddToProceedGuard]}
       ]},
      { path: 'WorkPlanView', component: WorkPlanViewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
        { path: 'WorkPlanBasicInfoView', component: WorkPlanBasicInfoViewComponent},
        { path: 'WorkPlanMultimediaView', component: WorkPlanMultimediaViewComponent},
        { path: 'WorkPlanDevicesView', component: WorkPlanDeviceViewComponent},
        { path: 'WorkPlanInstructionView', component: WorkPlanInstructionViewComponent},
        { path: 'WorkPlanHistoryView', component: WorkPlanHistoryViewComponent}
       ]
      },
      { path: 'Consumers', component: ConsumersComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
         { path: 'ConsumersFiltered', component: ConsumersFilteredComponent}
       ]
      },
      { path: 'WorkAccount', component: WorkAccountComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
       children: [
         { path: 'WorkAccountFiltered', component: WorkAccountFilteredComponent}
       ]
      },
      { path: 'WorkAccountNew', component: WorkAccountNewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'},
      children: [
        { path: 'WorkAccountBasicInfo', component: WorkAccountBasicInfoComponent},
        { path: 'WorkAccountHistoryStateChanges', component: WorkAccountHistoryStateChangesComponent},
        { path: 'WorkAccountMultimedia', component: WorkAccountMultimediaComponent}
      ]},
      { path: 'AddingTeamsNew', component: AddingTeamsNewComponent, canActivate:[RoleGuard], data: { role: 'Consumer'}},
      { path: 'AddingTeams', component: AddingTeamsComponent, canActivate:[RoleGuard], data: { role: 'Consumer'} },
      { path: 'Map', component: MapComponent},
      { path: 'Settings', component: SettingsComponent, canActivate:[RoleGuard], data: { role: 'Consumer'}}
    ]},
  { path: '', component: LoginComponent, pathMatch: 'full' },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
