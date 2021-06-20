import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum NotificationType{
  Error,
  Info,
  Warning,
  Success
}

export class Notification {
  public notificationID : number;
  public userID: string;
  public description : string;
  public type: NotificationType;
  public isRead: boolean;
  public hasLink: boolean;
  public link?: string;
  public date: Date;

  constructor(userID: string, description: string, type: NotificationType, isRead: boolean, hasLink: boolean, date: Date, link?: string){
    this.userID = userID;
    this.description = description;
    this.type = type;
    this.isRead = isRead;
    this.hasLink = hasLink;
    this.link = link;
    this.date = date;
  }
}
