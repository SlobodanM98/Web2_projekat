import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewAllProfilesComponent } from './components/view-all-profiles/view-all-profiles.component'
import { NavbarComponent } from './components/navbar/navbar.component'

const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch:'full' },
  { path: 'Register', component: RegisterComponent },
  { path: 'Navbar', component: NavbarComponent, 
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'ViewAllProfiles', component: ViewAllProfilesComponent },
    ]},
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
