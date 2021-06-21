import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/model/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-multimedia-attachments',
  templateUrl: './multimedia-attachments.component.html',
  styleUrls: ['./multimedia-attachments.component.css']
})
export class MultimediaAttachmentsComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos:any[] = [];
  message = '';
  fileInfos: Observable<any>;
  workingIncident:any;
  allIncidents:Array<Incident>;

  constructor(private fb:FormBuilder, private incidentService:IncidentService) { }

  submitImageForm: FormGroup;
  selectedImage: File;

  notification: Notification;

  imageSrc:string = '../assets/profil.png';

  allImages: Array<string>;

  ngOnInit(): void {
    
    this.allImages = new Array<string>();
    this.allIncidents=  new Array<Incident>();

    this.incidentService.getIncidents().subscribe(data => {
      this.allIncidents = data;
      this.workingIncident = this.allIncidents.pop();
      this.incidentService.getIncidentImage(Number(this.workingIncident.id)).subscribe(data=>{
        this.allImages = new Array<string>();
        this.allImages = data;
      });

    });

    

    this.submitImageForm = this.fb.group({
      image: ['', [
        Validators.required
      ]]
    })
  }
  onChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      this.selectedImage = <File>e.target.files[0];
    }
  }

  submitImage(){
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);

    this.incidentService.postIncidentImage(this.selectedImage, Number(this.workingIncident.id)).subscribe(data=>{   
      //this.notification = new Notification(DecodedToken.id, "Work plan image added successfully!", NotificationType.Success, false, false, new Date());
      //this.notificationService.postNotification(this.notification).subscribe();
      //this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    
      this.incidentService.getIncidentImage(Number(this.workingIncident.id)).subscribe(data=>{
        this.allImages = new Array<string>();
        this.allImages = data;
      });
    }, error => {    
      /*     
      this.notification = new Notification(DecodedToken.id, "Work plan image added unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    */
    });

    this.imageSrc = '../assets/profil.png';
    this.submitImageForm.controls['image'].reset;
  }

  

  
}
