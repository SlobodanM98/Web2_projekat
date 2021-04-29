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
import {DocumentsFilteredComponent} from './components/documents/documents-filtered/documents-filtered.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { IncidentsNewComponent } from './components/incidents/incidents-new/incidents-new.component';
import { IncidentsFilteredComponent } from './components/incidents/incidents-filtered/incidents-filtered.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch:'full' },
  { path: 'Register', component: RegisterComponent },
  
  { path: 'Navbar', component: NavbarComponent, 
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'Incidents', component:IncidentsComponent,
      children:
      [
        
        {path:'IncidentsFilteded', component:IncidentsFilteredComponent}
      ]},
      { path :'Documents', component:DocumentsComponent,
      children:[
        { path:'DocumentsFiltered', component:DocumentsFilteredComponent}
      ]},
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'ViewAllProfiles', component: ViewAllProfilesComponent },
      { path: 'Notifications', component: NotificationsComponent},
      { path: 'WorkPlan', component: WorkPlanComponent,
       children: [
         { path: 'WorkPlanFiltered', component: WorkPlanFilteredComponent}
       ]},
       {path:'newIncident', component:IncidentsNewComponent},
      { path: 'WorkPlanNew', component: WorkPlanNewComponent,
       children: [
         { path: 'WorkPlanBasicInfo', component: WorkPlanBasicInfoComponent}
       ]},
      { path: 'Consumers', component: ConsumersComponent,
       children: [
         { path: 'ConsumersFiltered', component: ConsumersFilteredComponent}
       ]
      }
    ]},
  { path: '', component: LoginComponent, pathMatch: 'full' },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
