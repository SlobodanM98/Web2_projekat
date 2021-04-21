import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export class NotificationDescription {
  constructor(public description: string, public type: string, public isRead: boolean, public hasLink: boolean, public link: string, public date: Date){}
}
