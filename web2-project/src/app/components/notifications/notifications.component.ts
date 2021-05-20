import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationDescription, NotificationType} from '../../model/notification-description/notification-description.module';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  allNotifications: Array<NotificationDescription>;
  filteredNotifications: Array<NotificationDescription>;

  constructor(private toastr : ToastrService) { }

  ngOnInit(): void {
    this.allNotifications = new Array<NotificationDescription>();
    this.allNotifications.push(new NotificationDescription("Save successfule", NotificationType.Success, false, false, "", new Date(2021,4,21,12,16)));
    this.allNotifications.push(new NotificationDescription("Uploated file has virus.", NotificationType.Error, false, false, "", new Date(2021,4,21,12,10)));
    this.allNotifications.push(new NotificationDescription("Switching plan S1 has changed it's status.", NotificationType.Info, false, true, "http://www.google.com", new Date(2021,4,21,12,12)));
    this.allNotifications.push(new NotificationDescription("Warning", NotificationType.Warning, false, false, "", new Date(2021,4,21,12,14)));

    this.filteredNotifications = new Array<NotificationDescription>();
  }

  onNotificationClick(notification: NotificationDescription){
    if(!notification.isRead){
      for(let element of this.allNotifications){
        if(element.description === notification.description && element.type === notification.type){
          element.isRead = true;
          break;
        }
      }
    }
  }

  showAllNotifications(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else if(element.type === NotificationType.Error){
          this.toastr.error(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else if(element.type === NotificationType.Info){
          this.toastr.info(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else{
          this.toastr.warning(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else if(element.type === NotificationType.Error){
          this.toastr.error(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else if(element.type === NotificationType.Info){
          this.toastr.info(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }else{
          this.toastr.warning(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showUnreadNotifications(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(!element.isRead){
        if(element.hasLink){
          if(element.type === NotificationType.Success){
            this.toastr.success(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error){
            this.toastr.error(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info){
            this.toastr.info(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else{
            this.toastr.warning(element.description + '<a href="' + element.link + '"> Open </a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }
        }else{
          if(element.type === NotificationType.Success){
            this.toastr.success(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Error){
            this.toastr.error(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else if(element.type === NotificationType.Info){
            this.toastr.info(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
          }else{
            this.toastr.warning(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
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
          this.toastr.error(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Error){
          this.toastr.error(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showInfos(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Info){
          this.toastr.info(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Info){
          this.toastr.info(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showSuccesses(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Success){
          this.toastr.success(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }
    });
  }

  showWarnings(){
    this.clearToast();
    this.allNotifications.forEach(element => {
      if(element.hasLink){
        if(element.type === NotificationType.Warning){
          this.toastr.warning(element.description + '<a href="' + element.link + '"> Open</a>', element.date.toLocaleString(),{enableHtml: true}).onTap.pipe().subscribe(() => this.onNotificationClick(element));
        }
      }else{
        if(element.type === NotificationType.Warning){
          this.toastr.warning(element.description, element.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick(element));
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
      }
    });
    this.clearToast();
  }
}
