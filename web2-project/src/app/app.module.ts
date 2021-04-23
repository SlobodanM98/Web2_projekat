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
import { WorkPlanComponent } from './components/work-plan/work-plan.component';
import { WorkPlanFilteredComponent } from './components/work-plan/work-plan-filtered/work-plan-filtered.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WorkPlanNewComponent } from './components/work-plan/work-plan-new/work-plan-new.component';
import { WorkPlanBasicInfoComponent } from './components/work-plan/work-plan-new/work-plan-basic-info/work-plan-basic-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ViewAllProfilesComponent,
    NavbarComponent,
    NotificationsComponent,
    WorkPlanComponent,
    WorkPlanFilteredComponent,
    WorkPlanNewComponent,
    WorkPlanBasicInfoComponent,
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
    }),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
