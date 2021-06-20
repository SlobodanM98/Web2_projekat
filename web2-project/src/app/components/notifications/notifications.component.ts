import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Settings } from 'src/app/model/settings';
import { NotificationService } from 'src/app/services/notification.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Notification, NotificationType} from '../../model/notification-description/notification.module';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  allNotifications: Array<Notification>;

  settings: Settings;

  userID: string;
  token: any;

  constructor(private toastr : ToastrService, private notificationService : NotificationService, private settingsService : SettingsService) { }

  ngOnInit(): void {
    this.allNotifications = new Array<Notification>();
    this.settings = new Settings();

    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    this.userID = DecodedToken.id;

    this.settingsService.getSettings().subscribe(data => {
      this.settings = data;
    });

    this.notificationService.getNotifications().subscribe(data =>{
      this.allNotifications = new Array<Notification>();
      this.allNotifications = data;
    });
  }

  onNotificationClick(notification: Notification){
    if(!notification.isRead){
      for(let element of this.allNotifications){
        if(element.notificationID === notification.notificationID){
          element.isRead = true;
          this.notificationService.putNotification(element).subscribe();
          break;
        }
      }
    }
  }

  showAllNotifications(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.userID === this.userID){
        if(element.hasLink){
          if(element.type === NotificationType.Success && this.settings.successEnabled){
            this.toastr.success(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error && this.settings.errorEnabled){
            this.toastr.error(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info && this.settings.infoEnabled){
            this.toastr.info(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Warning && this.settings.warningEnabled){
            this.toastr.warning(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }
        }else{
          if(element.type === NotificationType.Success && this.settings.successEnabled){
            this.toastr.success(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error && this.settings.errorEnabled){
            this.toastr.error(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info && this.settings.infoEnabled){
            this.toastr.info(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Warning && this.settings.warningEnabled){
            this.toastr.warning(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }
        }
      }
    });
  }

  showUnreadNotifications(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(!element.isRead){
        if(element.hasLink){
          if(element.type === NotificationType.Success && this.settings.successEnabled){
            this.toastr.success(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error && this.settings.errorEnabled){
            this.toastr.error(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info && this.settings.infoEnabled){
            this.toastr.info(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Warning && this.settings.warningEnabled){
            this.toastr.warning(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }
        }else{
          if(element.type === NotificationType.Success && this.settings.successEnabled){
            this.toastr.success(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error && this.settings.errorEnabled){
            this.toastr.error(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info && this.settings.infoEnabled){
            this.toastr.info(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Warning && this.settings.warningEnabled){
            this.toastr.warning(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }
        }
      }
    });
  }

  showErrors(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Error){
          this.toastr.error(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Error){
          this.toastr.error(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showInfos(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Info){
          this.toastr.info(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Info){
          this.toastr.info(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showSuccesses(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showWarnings(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Warning){
          this.toastr.warning(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true, timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Warning){
          this.toastr.warning(element.description, element.date.toLocaleString(), {timeOut : 5000}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  clearToast(){
    var toastrIDs: Array<number>;
    toastrIDs = Array<number>();
    for(let element of this.toastr.toasts){
      toastrIDs.push(element.toastId);
    }

    toastrIDs.forEach(element => {
      this.toastr.remove(element);
    });
  }

  markAllAsRead(){
    this.allNotifications.forEach(element => {
      if(!element.isRead){
        element.isRead = true;
        this.notificationService.putNotification(element).subscribe();
      }
    });
    this.clearToast();
  }
}
