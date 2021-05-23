import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum NotificationType{
  Error,
  Info,
  Warning,
  Success
}

export class NotificationDescription {
  constructor(public description: string, public type: NotificationType, public isRead: boolean, public hasLink: boolean, public link: string, public date: Date){}
}
