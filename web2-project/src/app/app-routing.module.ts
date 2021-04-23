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

const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch:'full' },
  { path: 'Register', component: RegisterComponent },
  { path: 'Navbar', component: NavbarComponent, 
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'ViewAllProfiles', component: ViewAllProfilesComponent },
      { path: 'Notifications', component: NotificationsComponent},
      { path: 'WorkPlan', component: WorkPlanComponent,
       children: [
         { path: 'WorkPlanFiltered', component: WorkPlanFilteredComponent}
       ]},
      { path: 'WorkPlanNew', component: WorkPlanNewComponent,
       children: [
         { path: 'WorkPlanBasicInfo', component: WorkPlanBasicInfoComponent}
       ]}
    ]},
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
