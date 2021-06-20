import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Incident } from 'src/app/model/incident';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { IncidentService } from 'src/app/services/incident.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-incidents-resolution',
  templateUrl: './incidents-resolution.component.html',
  styleUrls: ['./incidents-resolution.component.css']
})
export class IncidentsResolutionComponent implements OnInit {


  resolutionForm:FormGroup;
  workingIncident:any;
  listIncident:Array<Incident>;

  poduzrokOtkaz:string[] = ["KratakSpoj", "Istrosenost", "MehanickiOtkaz"];
  poduzrokVreme:string[] = ["Kisa", "Grad", "Vetar", "Uragan"];
  poduzrokHumanError:string[] = ["PogresnaOprema", "LosNapon", "LosaInstalacija"];
  poduzrok:string[];

  notification: Notification;

  constructor(private fb: FormBuilder, private incService:IncidentService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.listIncident = new Array<Incident>();
    this.incService.getIncidents().subscribe(data =>{
        //console.log(data);
        this.listIncident = new Array<Incident>();
        this.listIncident = data; 
        this.workingIncident = this.listIncident.pop();
        console.log(this.workingIncident);
        
      }

    );
    //console.log(this.listIncident);
    this.resolutionForm = this.fb.group(
      {
        cause: ['', [Validators.required]],
        subcause : ['',[Validators.required]],
        construction: ['',[Validators.required]],
        material: ['',[Validators.required]]
      })
      
      

  }
  submitResolution()
  {
    console.log('working incident:'+this.workingIncident);
    this.workingIncident.uzrok = this.resolutionForm.controls["cause"].value;
    this.workingIncident.poduzrok = this.resolutionForm.controls["subcause"].value;
    this.workingIncident.konstrukcija = this.resolutionForm.controls["construction"].value;
    this.workingIncident.materijal = this.resolutionForm.controls["material"].value;
    this.incService.putIncident(this.workingIncident).subscribe(data=>{
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Resolution added successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    }, error => {
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Resolution added unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    });
    console.log(this.workingIncident);

  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  uzrokPromena(event:any)
  {
    if (event.value === "Vreme")
    {
      this.poduzrok = this.poduzrokVreme;
    }
    else if (event.value === "Otkaz")
    {
      this.poduzrok = this.poduzrokOtkaz;
    }
    else if (event.value === "LjudskiFaktor")
    {
      this.poduzrok = this.poduzrokHumanError;
    }
  }
}
