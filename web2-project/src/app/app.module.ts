import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ViewAllProfilesComponent } from './components/view-all-profiles/view-all-profiles.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ViewAllProfilesComponent,
    NavbarComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DashboardModule,
    NgbModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
