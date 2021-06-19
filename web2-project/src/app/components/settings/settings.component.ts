import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator, ConfirmPasswordMatcher } from 'src/app/directives/custom-validator';
import { Address } from 'src/app/model/address';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { Settings } from 'src/app/model/settings';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  passwordForm: FormGroup;
  confirmPasswordMatcher = new ConfirmPasswordMatcher();

  priorityForm: FormGroup;
  allAddresses: Array<Address>;
  
  notification: Notification;

  constructor(private settingsService: SettingsService, private userService: UserService, private notificationService: NotificationService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup(
      {
        password: new FormControl('',[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
        confirmPassword: new FormControl('',[Validators.required])
      },
      {
        validators: confirmPasswordValidator()
      }
    );

    this.priorityForm = new FormGroup(
      {
        address: new FormControl('',[Validators.required]),
        priority: new FormControl('',[Validators.required])
      }
    );
    this.allAddresses = new Array<Address>();
    
    this.settingsService.getAddress().subscribe(data => {
      this.allAddresses = data;
    });

    this.settings = new Settings();

    this.settingsService.getSettings().subscribe(data => {
      this.settings = data;
    });
  }

  submitPassword(){
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.userService.getUser(DecodedToken.id).subscribe(user=>{
      user.password = this.passwordForm.controls['password'].value;
      this.userService.putUserPassword(user).subscribe(data =>{
        this.notification = new Notification(user.id, "Password changed successfully!", NotificationType.Success, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        this.userService.setUser(user);
      }, error => {        
        this.notification = new Notification(user.id, "Password changed unsuccessfully!", NotificationType.Error, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      });
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

  submitPriority(){
    var address : Address;
    address = new Address(1,"",1,"",1,1);

    this.allAddresses.forEach(element => {
      if(element.addressID === Number(this.priorityForm.controls['address'].value)){
        address = element;
      }
    });

    address.priority = Number(this.priorityForm.controls['priority'].value);

    this.settingsService.putAddress(address).subscribe();
  }

  setValue(checked: boolean, name: string){
    switch(name){
      case "success":
        this.settings.successEnabled = checked;
        break;
      case "error":
        this.settings.errorEnabled = checked;
        break;
      case "info":
        this.settings.infoEnabled = checked;
        break;
      case "warning":
        this.settings.warningEnabled = checked;
        break;
      case "showFields":
        this.settings.showFields = checked;
        break;
    }

    this.settingsService.putSettings(this.settings).subscribe();
  }

  setCallIconValue(checked: boolean, name: string){
    switch(name){
      case "blue":
        this.settings.callIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";
        break;
      case "yellow":
        this.settings.callIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png";
        break;
      case "red":
        this.settings.callIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
        break;
    }

    this.settingsService.putSettings(this.settings).subscribe();
  }

  setIncidentIconValue(checked: boolean, name: string){
    switch(name){
      case "blue":
        this.settings.incidentIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";
        break;
      case "yellow":
        this.settings.incidentIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png";
        break;
      case "red":
        this.settings.incidentIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
        break;
    }

    this.settingsService.putSettings(this.settings).subscribe();
  }

  setTeamIconValue(checked: boolean, name: string){
    switch(name){
      case "blue":
        this.settings.teamIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";
        break;
      case "yellow":
        this.settings.teamIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png";
        break;
      case "red":
        this.settings.teamIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
        break;
    }

    this.settingsService.putSettings(this.settings).subscribe();
  }

  reset(){
    this.settings.successEnabled = true;
    this.settings.errorEnabled = true;
    this.settings.infoEnabled = true;
    this.settings.warningEnabled = true;
    this.settings.showFields = true;
    this.settings.callIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
    this.settings.incidentIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png";
    this.settings.teamIcon = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";

    this.settingsService.putSettings(this.settings).subscribe();
  }
}
