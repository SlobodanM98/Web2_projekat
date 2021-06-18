import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification-description/notification.module';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url + "/api/Notification");
  }

  postNotification(notification: Notification){
    return this.http.post(this.url + "/api/Notification", notification);
  }

  putNotification(notification: Notification){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Notification", notification, httpOptions);
  }

  deleteNotification(id: number){
    return this.http.delete(this.url + "/api/Notification/" + id);
  }
}
