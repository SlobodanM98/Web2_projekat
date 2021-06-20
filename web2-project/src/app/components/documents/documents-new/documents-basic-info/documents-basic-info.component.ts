import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafetyDocument, TipDokumenta } from 'src/app/model/safety-document';
import { Team } from 'src/app/model/team/team.model';
import { DocumentService } from 'src/app/services/document.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-documents-basic-info',
  templateUrl: './documents-basic-info.component.html',
  styleUrls: ['./documents-basic-info.component.css']
})
export class DocumentsBasicInfoComponent implements OnInit {

 
  DocumentBasicInfo:FormGroup;
  doc:SafetyDocument;
  td:TipDokumenta;
  t:Team;
  isNew:boolean;
  username:string;
  token:any;
  allTeams:Array<Team>;

  notification: Notification;

  constructor(private fb: FormBuilder, private docService:DocumentService, private notificationService: NotificationService, private toastr: ToastrService) { }


  ngOnInit(): void {

    this.DocumentBasicInfo = this.fb.group({
      documentType: ['',Validators.required],
      phoneNum: ['',Validators.required],
      status:['',Validators.required],
      crew:['',Validators.required],
      switchPlan:['',Validators.required],
      dateCreated:['',Validators.required],
      author:['',Validators.required],
      details:['',Validators.required],
      notes:['',Validators.required],
     

    });

    this.allTeams = new Array<Team>();
    this.docService.getTeams().subscribe(data => {
      this.allTeams = new Array<Team>();
      this.allTeams = data;
    })
    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    //console.log(DecodedToken);
    this.username = DecodedToken.username;
  }

  saveDocBasicInfo(){
    
    if (this.DocumentBasicInfo.controls["documentType"].value === "Planned")
    {
      this.td = TipDokumenta.PlaniraniRad
    }
    else{
      this.td = TipDokumenta.NeplaniraniRad;
    }

    console.log(this.td.toString());
    this.doc = new SafetyDocument();
    this.doc.Tip = this.td;
    this.doc.PhoneNum = this.DocumentBasicInfo.controls["phoneNum"].value;
    this.doc.Status = this.DocumentBasicInfo.controls["status"].value;
    this.doc.Author = this.username;
    this.doc.PlanRada = this.DocumentBasicInfo.controls["switchPlan"].value;
    this.doc.Details = this.DocumentBasicInfo.controls["details"].value;
    this.doc.Notes = this.DocumentBasicInfo.controls["notes"].value;
    this.doc.Team = this.DocumentBasicInfo.controls["crew"].value;
    this.doc.dateOfCreation = this.DocumentBasicInfo.controls["dateCreated"].value;
    


    //this.doc = new SafetyDocument(this.td,"/",this.DocumentBasicInfo.controls["author"].value,this.t,this.DocumentBasicInfo.controls["details"].value,this.DocumentBasicInfo.controls["notes"].value,this.DocumentBasicInfo.controls["phoneNum"].value, this.DocumentBasicInfo.controls["dateCreated"].value);
    console.log(this.doc);
    this.docService.postDocument2(this.doc).subscribe(data=>{
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Document created successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    }, error => {
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Document created unsuccessfully!", NotificationType.Error, false, false, new Date());
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
}
