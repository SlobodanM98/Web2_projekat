import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { Call } from 'src/app/model/call';
import { Device } from 'src/app/model/device';
import { Incident, IncidentType } from 'src/app/model/incident';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { Team } from 'src/app/model/team/team.model';
import { User } from 'src/app/model/user';
import { Type, WorkPlan } from 'src/app/model/work-plan';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

@Component({
  selector: 'app-work-plan-basic-info',
  templateUrl: './work-plan-basic-info.component.html',
  styleUrls: ['./work-plan-basic-info.component.css']
})
export class WorkPlanBasicInfoComponent implements OnInit {

  workPlanForm: FormGroup;
  currentDate = new Date();

  allAddresses: Array<Address>;
  allIncidents: Array<Incident>;
  allTeams: Array<Team>;

  notification: Notification;

  user: User;

  constructor(private fb: FormBuilder, private addToProceed: AddToProceedService, private userService: UserService, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addToProceed.canMove = false;

    this.allAddresses = new Array<Address>();
    this.workPlanService.getAddress().subscribe(data=>{
      this.allAddresses = new Array<Address>();
      this.allAddresses = data;
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
        Validators.required
      ]],
      incident: ['', [
      ]],
      address: ['', [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
      team: ['', [
        //Validators.required
      ]],
      purpose: ['', [
        Validators.required
      ]],
      notes: ['', [
      ]],
      company: ['', [
        Validators.required
      ]],
      phoneNomber: ['', [
        Validators.required
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkPlan(){
    this.addToProceed.canMove = true;
    this.addToProceed.canReturn = false;

    this.allAddresses.forEach(element => {
      if(element.addressID == this.workPlanForm.controls['address'].value){
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
        var type: Type;

        switch(this.workPlanForm.controls['type'].value){
          case "Planned":
            type = Type.Planned;
            break;
          default:
            type = Type.Unplanned;
            break;
        }

        var workPlan : WorkPlan = new WorkPlan(type, element, DecodedToken.id, this.workPlanForm.controls['startDate'].value, this.workPlanForm.controls['endDate'].value, this.workPlanForm.controls['purpose'].value, this.workPlanForm.controls['notes'].value, this.workPlanForm.controls['company'].value, this.workPlanForm.controls['phoneNomber'].value, new Date());
        console.log(workPlan);
        this.workPlanService.postWorkPlan(workPlan).subscribe(data =>{
          this.notification = new Notification(DecodedToken.id, "Work plan created successfully!", NotificationType.Success, false, false, new Date());
          this.notificationService.postNotification(this.notification).subscribe();
          this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());

          this.workPlanService.getWorkPlan().subscribe(workPlans=>{
            localStorage.setItem("workPlan", workPlans[workPlans.length - 1].workPlanID.toString());
          });
        }, error => {         
          this.notification = new Notification(DecodedToken.id, "Work plan created unsuccessfully!", NotificationType.Error, false, false, new Date());
          this.notificationService.postNotification(this.notification).subscribe();
          this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        });
      }
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
    return this.workPlanForm.get('pnotes');
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
}
