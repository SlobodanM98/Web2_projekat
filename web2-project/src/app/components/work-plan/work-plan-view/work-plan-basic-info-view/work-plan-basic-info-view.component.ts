import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { Incident } from 'src/app/model/incident';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { Team } from 'src/app/model/team/team.model';
import { User } from 'src/app/model/user';
import { Status, Type, WorkPlan, WorkPlanStatusHistory } from 'src/app/model/work-plan';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

@Component({
  selector: 'app-work-plan-basic-info-view',
  templateUrl: './work-plan-basic-info-view.component.html',
  styleUrls: ['./work-plan-basic-info-view.component.css']
})
export class WorkPlanBasicInfoViewComponent implements OnInit {
  workPlanForm: FormGroup;
  currentDate = new Date();

  allAddresses: Array<Address>;
  allIncidents: Array<Incident>;
  allTeams: Array<Team>;

  notification: Notification;

  user: User;

  workPlan: WorkPlan;

  constructor(private fb: FormBuilder, private addToProceed: AddToProceedService, private userService: UserService, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addToProceed.canMove = false;

    this.allAddresses = new Array<Address>();
    this.workPlanService.getAddress().subscribe(data=>{
      this.allAddresses = new Array<Address>();
      this.allAddresses = data;
    });

    this.workPlanService.getWorkPlanID(Number(localStorage.getItem("workPlan"))).subscribe(data=>{
      this.workPlan = data;
    });

    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);

    this.userService.getUser(DecodedToken.id).subscribe(data=>{
      this.user = data;
    });

    this.allIncidents = new Array<Incident>();

    this.workPlanForm = this.fb.group({
      type: ['', [
      ]],
      status: ['', [
      ]],
      incident: ['', [
      ]],
      address: ['', [
      ]],
      startDate: ['', [
      ]],
      endDate: ['', [
      ]],
      team: ['', [
      ]],
      purpose: ['', [
      ]],
      notes: ['', [
      ]],
      company: ['', [
      ]],
      creationDate: ['', [
      ]],
      phoneNomber: ['', [
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkPlan(){
    var workPlan: WorkPlan = this.workPlan;
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);

    if(this.workPlanForm.controls['type'].value != ""){
      workPlan.type = this.workPlanForm.controls['type'].value;
    }
    if(this.workPlanForm.controls['incident'].value != ""){
      workPlan.incident!.id = this.workPlanForm.controls['incident'].value;
    }
    if(this.workPlanForm.controls['address'].value != ""){
      workPlan.address.addressID = this.workPlanForm.controls['address'].value;
    }
    if(this.workPlanForm.controls['startDate'].value != ""){
      workPlan.startDate = this.workPlanForm.controls['startDate'].value;
    }
    if(this.workPlanForm.controls['endDate'].value != ""){
      workPlan.endDate = this.workPlanForm.controls['endDate'].value;
    }
    if(this.workPlanForm.controls['team'].value != ""){
      workPlan.team.id = this.workPlanForm.controls['team'].value;
    }
    if(this.workPlanForm.controls['purpose'].value != ""){
      workPlan.purpose = this.workPlanForm.controls['purpose'].value;
    }
    if(this.workPlanForm.controls['company'].value != ""){
      workPlan.company = this.workPlanForm.controls['company'].value;
    }
    if(this.workPlanForm.controls['notes'].value != ""){
      workPlan.notes = this.workPlanForm.controls['notes'].value;
    }
    if(this.workPlanForm.controls['phoneNomber'].value){
      workPlan.phone = this.workPlanForm.controls['phoneNomber'].value;
    }
    if(this.workPlanForm.controls['creationDate'].value != ""){
      workPlan.creationDate = this.workPlanForm.controls['creationDate'].value;
    }
    if(this.workPlanForm.controls['status'].value != ""){
      var status : Status;
      switch(this.workPlanForm.controls['status'].value){
        case "Approved":
          status = Status.Approved;
          break;
        case "Denied":
          status = Status.Denied;
          break;
        default:
          status = Status.Canceled;
          break;
      }
      workPlan.status = status;
      var history : WorkPlanStatusHistory = new WorkPlanStatusHistory(new Date(), DecodedToken.id, status, workPlan.workPlanID);
      this.workPlanService.postWorkPlanHistory(history).subscribe()
    }

    this.workPlanService.putWorkPlan(workPlan).subscribe(data =>{
      this.notification = new Notification(DecodedToken.id, "Work plan changed successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    }, error => {         
      this.notification = new Notification(DecodedToken.id, "Work plan changed unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    });
  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  get type(){
    return this.workPlanForm.get('type');
  }

  get incident(){
    return this.workPlanForm.get('incident');
  }

  get address(){
    return this.workPlanForm.get('address');
  }

  get startDate(){
    return this.workPlanForm.get('startDate');
  }

  get endDate(){
    return this.workPlanForm.get('endDate');
  }

  get team(){
    return this.workPlanForm.get('team');
  }

  get purpose(){
    return this.workPlanForm.get('purpose');
  }

  get notes(){
    return this.workPlanForm.get('notes');
  }

  get company(){
    return this.workPlanForm.get('company');
  }

  get phoneNomber(){
    return this.workPlanForm.get('phoneNomber');
  }

  get creationDate(){
    return this.workPlanForm.get('creationDate');
  }

  get status(){
    return this.workPlanForm.get('status');
  }

  hasInput(){
    if(this.workPlanForm.controls['type'].value || this.workPlanForm.controls['incident'].value 
      || this.workPlanForm.controls['address'].value || this.workPlanForm.controls['startDate'].value
        || this.workPlanForm.controls['endDate'].value || this.workPlanForm.controls['team'].value 
          || this.workPlanForm.controls['purpose'].value || this.workPlanForm.controls['notes'].value
            || this.workPlanForm.controls['company'].value || this.workPlanForm.controls['phoneNomber'].value
              || this.workPlanForm.controls['creationDate'].value || this.workPlanForm.controls['status'].value){
                return true;
    }else{
      return false;
    }
  }
}
