import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
import { ConsumersComponent } from './components/consumers/consumers.component';
import { ConsumersFilteredComponent } from './components/consumers/consumers-filtered/consumers-filtered.component';
import {MatIconModule} from '@angular/material/icon';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentsFilteredComponent } from './components/documents/documents-filtered/documents-filtered.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { IncidentsFilteredComponent } from './components/incidents/incidents-filtered/incidents-filtered.component';
import { IncidentsNewComponent } from './components/incidents/incidents-new/incidents-new.component';
import { IncidentsBasicInfoComponent } from './components/incidents/incidents-new/incidents-basic-info/incidents-basic-info.component';
import { AddingTeamsComponent } from './components/adding-teams/adding-teams.component';
import { AddingTeamsNewComponent } from './components/adding-teams/adding-teams-new/adding-teams-new.component';
import { WorkAccountComponent } from './components/work-account/work-account.component';
import { WorkAccountFilteredComponent } from './components/work-account/work-account-filtered/work-account-filtered.component';
import { WorkAccountNewComponent } from './components/work-account/work-account-new/work-account-new.component';
import { WorkAccountBasicInfoComponent } from './components/work-account/work-account-new/work-account-basic-info/work-account-basic-info.component';
import { MapComponent } from './components/map/map.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DevicesFilteredComponent } from './components/devices/devices-filtered/devices-filtered.component';
import { SettingsComponent } from './components/settings/settings.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { WorkAccountHistoryStateChangesComponent } from './components/work-account/work-account-new/work-account-history-state-changes/work-account-history-state-changes.component';
import { WorkAccountMultimediaComponent } from './components/work-account/work-account-new/work-account-multimedia/work-account-multimedia.component';
import { AddToProceedGuard } from './guards/add-to-proceed.guard';
import { WorkPlanMultimediaComponent } from './components/work-plan/work-plan-new/work-plan-multimedia/work-plan-multimedia.component';
import { NoReturnGuard } from './guards/no-return.guard';
import { WorkPlanDevicesComponent } from './components/work-plan/work-plan-new/work-plan-devices/work-plan-devices.component';
import { WorkPlanInstructionsComponent } from './components/work-plan/work-plan-new/work-plan-instructions/work-plan-instructions.component';
import { DocumentsNewComponent } from './components/documents/documents-new/documents-new.component';
import { DocumentsBasicInfoComponent } from './components/documents/documents-new/documents-basic-info/documents-basic-info.component';
import { DocumentsChecklistComponent } from './components/documents/documents-new/documents-checklist/documents-checklist.component';
import { IncidentDevicesComponent } from './components/incidents/incidents-new/incident-devices/incident-devices.component';
import { IncidentsResolutionComponent } from './components/incidents/incidents-new/incidents-resolution/incidents-resolution.component';

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
    ConsumersComponent,
    ConsumersFilteredComponent,
    DocumentsComponent,
    DocumentsFilteredComponent,
    IncidentsComponent,
    IncidentsFilteredComponent,
    IncidentsNewComponent,
    IncidentsBasicInfoComponent,
    AddingTeamsComponent,
    AddingTeamsNewComponent,
    WorkAccountComponent,
    WorkAccountFilteredComponent,
    WorkAccountNewComponent,
    WorkAccountBasicInfoComponent,
    MapComponent,
    DevicesComponent,
    DevicesFilteredComponent,
    SettingsComponent,
    WorkAccountHistoryStateChangesComponent,
    WorkAccountMultimediaComponent,
    WorkPlanMultimediaComponent,
    WorkPlanDevicesComponent,
    WorkPlanInstructionsComponent,
    DocumentsNewComponent,
    DocumentsBasicInfoComponent,
    DocumentsChecklistComponent,
    IncidentDevicesComponent,
    IncidentsResolutionComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DashboardModule,
    NgbModule,
    DragDropModule,
    ToastrModule.forRoot({
      disableTimeOut: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [AddToProceedGuard, NoReturnGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
