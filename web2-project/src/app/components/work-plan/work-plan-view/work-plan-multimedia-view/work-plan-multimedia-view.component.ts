import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { NotificationService } from 'src/app/services/notification.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

@Component({
  selector: 'app-work-plan-multimedia-view',
  templateUrl: './work-plan-multimedia-view.component.html',
  styleUrls: ['./work-plan-multimedia-view.component.css']
})
export class WorkPlanMultimediaViewComponent implements OnInit {

  constructor(private fb: FormBuilder, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  submitImageForm: FormGroup;
  selectedImage: File;

  notification: Notification;

  imageSrc:string = '../assets/profil.png';

  allImages: Array<string>;

  ngOnInit(): void {
    this.allImages = new Array<string>();

    this.workPlanService.getWorkPlanImage(Number(localStorage.getItem("workPlan"))).subscribe(data=>{
      this.allImages = new Array<string>();
      this.allImages = data;
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

    this.workPlanService.postWorkPlanImage(this.selectedImage, Number(localStorage.getItem("workPlan"))).subscribe(data=>{   
      this.notification = new Notification(DecodedToken.id, "Work plan image added successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    
      this.workPlanService.getWorkPlanImage(Number(localStorage.getItem("workPlan"))).subscribe(data=>{
        this.allImages = new Array<string>();
        this.allImages = data;
      });
    }, error => {         
      this.notification = new Notification(DecodedToken.id, "Work plan image added unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    });

    this.imageSrc = '../assets/profil.png';
    this.submitImageForm.controls['image'].reset;
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
