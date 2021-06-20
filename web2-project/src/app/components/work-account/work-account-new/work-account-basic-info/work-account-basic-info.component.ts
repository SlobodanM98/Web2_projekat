import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkAccountService } from '../../../../services/work-account/work-account.service';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';
import { WorkAccount, Type, Status } from '../../../../model/work-account';
import { Address } from '../../../../model/address';
import { IncidentService } from '../../../../services/incident.service';
import { Incident } from 'src/app/model/incident';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';

@Component({
  selector: 'app-work-account-basic-info',
  templateUrl: './work-account-basic-info.component.html',
  styleUrls: ['./work-account-basic-info.component.css']
})
export class WorkAccountBasicInfoComponent implements OnInit {

  workAccountForm: FormGroup;
  currentDate = new Date();
  currentState: string = "Draft";
  allAddresses: Array<Address>;
  allIncidents: Array<Incident>;
  fullName: string;

  notification: Notification;

  constructor(private fb: FormBuilder, private workAccountService: WorkAccountService, private addToProceed: AddToProceedService, private incidentService: IncidentService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addToProceed.canMove = false;
    if(this.workAccountService.currentState2 !== "") {
      this.currentState = this.workAccountService.currentState2;
    }

    this.workAccountService.getAddresses().subscribe(data => {
      this.allAddresses = data;
    });

    this.incidentService.getIncidents().subscribe(data => {
      this.allIncidents = data;
    });

    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    console.log(DecodedToken);
    this.fullName = DecodedToken.fullName;

    this.workAccountForm = this.fb.group({
      type: [this.workAccountService.currentType, [
        Validators.required
      ]],
      state: [this.currentState,[
        Validators.required
      ]],
      urgentWork: [this.workAccountService.currentEmergencyWork, [
        
      ]],
      incident: ['', [
        Validators.required
      ]],
      address: [this.workAccountService.currentAddress, [
        Validators.required
      ]],
      startDate: [this.workAccountService.currentStartDate, [
        Validators.required
      ]],
      endDate: [this.workAccountService.currentEndDate, [
        Validators.required
      ]],
      purpose: [this.workAccountService.currentPurpose, [
        Validators.required
      ]],
      notes: [this.workAccountService.currentNotes, [
      ]],
      company: [this.workAccountService.currentCompany, [
        Validators.required
      ]],
      phoneNumber: [this.workAccountService.currentPhoneNomber, [
        Validators.required
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkAccount(){
    this.addToProceed.canMove = true;
    this.addToProceed.canReturn = false;

    var type;
    switch(this.workAccountForm.controls['type'].value){
      case "PlannedWork":
        type = Type.PlannedWork;
        break;
      default:
        type = Type.UnplannedWork;
        break;
    }

    var state;
    switch(this.workAccountForm.controls['state'].value){
      case "Draft":
        state = Status.Draft;
        break;
      case "Approved":
        state = Status.Approved;
        break;
      case "Canceled":
        state = Status.Canceled;
        break;
      default:
        state = Status.Denied;
        break;
    }

    var address : Address;
    address = new Address(1,"",1,"",1,1);
    this.allAddresses.forEach(element => {
      if(element.addressID == this.workAccountForm.controls['address'].value){
        address = element;
      }
    });

    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    var userID = DecodedToken.id;
    var incident = +this.workAccountForm.controls['incident'].value;

    var workAccount = new WorkAccount(type, state, incident, address, this.workAccountForm.controls['startDate'].value, this.workAccountForm.controls['endDate'].value, userID, this.workAccountForm.controls['purpose'].value, this.workAccountForm.controls['notes'].value, this.workAccountForm.controls['urgentWork'].value, this.workAccountForm.controls['company'].value, this.workAccountForm.controls['phoneNumber'].value, this.currentDate, undefined);
    console.log(workAccount);

    this.workAccountService.postWorkAccount(workAccount).subscribe(
      (res:any) => {
        console.log("Uspeh!!!");
        this.notification = new Notification(DecodedToken.id, "Work account created successfully!", NotificationType.Success, false, false, new Date());
          this.notificationService.postNotification(this.notification).subscribe();
          this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      },
      err => {
        console.log("ERROR!!!");
        this.notification = new Notification(DecodedToken.id, "Work account created unsuccessfully!", NotificationType.Error, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      }
    );
  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  typeChanged(e:any) {
    console.log("aaa");
    this.workAccountService.currentType = e.target.value;
  }

  stateChanged(e:any) {
    this.workAccountService.currentState2 = e.target.value;
  }

  emergencyWorkChanged(e:any) {
    this.workAccountService.currentEmergencyWork = e.target.checked;
  }

  addressChanged(e:any) {
    this.workAccountService.currentAddress = e.target.value;
  }

  startDateChanged(e:any) {
    this.workAccountService.currentStartDate = e.target.value;
  }

  endDateChanged(e:any) {
    this.workAccountService.currentEndDate = e.target.value;
  }

  companyChanged(e:any) {
    this.workAccountService.currentCompany = e.target.value;
  }

  phoneNomberChanged(e:any) {
    this.workAccountService.currentPhoneNomber = e.target.value;
  }

  purposeChanged(e:any) {
    this.workAccountService.currentPurpose = e.target.value;
  }

  notesChanged(e:any) {
    this.workAccountService.currentNotes = e.target.value;
  }

  get type(){
    return this.workAccountForm.get('type');
  }

  get state(){
    return this.workAccountForm.get('state');
  }

  get incident(){
    return this.workAccountForm.get('incident');
  }

  get urgentWork() {
    return this.workAccountForm.get('emergencyWork');
  }

  get address(){
    return this.workAccountForm.get('address');
  }

  get startDate(){
    return this.workAccountForm.get('startDate');
  }

  get endDate(){
    return this.workAccountForm.get('endDate');
  }

  get purpose(){
    return this.workAccountForm.get('purpose');
  }

  get notes(){
    return this.workAccountForm.get('pnotes');
  }

  get company(){
    return this.workAccountForm.get('company');
  }

  get phoneNumber(){
    return this.workAccountForm.get('phoneNumber');
  }

}
