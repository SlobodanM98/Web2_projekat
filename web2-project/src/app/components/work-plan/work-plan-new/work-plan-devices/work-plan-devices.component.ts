import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Device, DeviceType } from 'src/app/model/device';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { DeviceService } from 'src/app/services/device.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

interface TableElement{
  ID: number;
  Name: string;
  Type: string;
}

@Component({
  selector: 'app-work-plan-devices',
  templateUrl: './work-plan-devices.component.html',
  styleUrls: ['./work-plan-devices.component.css']
})
export class WorkPlanDevicesComponent implements OnInit {

  allDevices: Array<Device>;
  workPlanDevices: Array<Device>;
  submitDeviceForm: FormGroup;

  displayedColumns: string[] = ['ID', 'Name', 'Type'];
  dataSource: any;

  notification: Notification;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private deviceService: DeviceService, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allDevices = new Array<Device>();
    this.workPlanDevices = new Array<Device>();

    this.deviceService.getDevices().subscribe(data=>{
      this.allDevices = new Array<Device>();
      this.allDevices = data;

      this.workPlanService.getWorkPlanDevice().subscribe(devices=>{
        this.workPlanDevices = new Array<Device>();

        this.allDevices.forEach(element => {
          devices.forEach(device => {
            if(element.id === device){
              this.workPlanDevices.push(element);
            }
          });
        });

        this.loadDevices();
      });
    });

    this.submitDeviceForm = this.fb.group({
      device: ['', [
        Validators.required
      ]]
    })

    this.loadDevices();
  }

  loadDevices(){
    var tableElements = new Array<TableElement>();
    this.workPlanDevices.forEach(element => {
      var data : TableElement = {ID: element.id, Name: element.name, Type: DeviceType[element.type].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  submitDevice(){
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);

    this.allDevices.forEach(element => {
      if(element.id == this.submitDeviceForm.controls['device'].value){
        this.workPlanService.postWorkPlanDevice(element, Number(localStorage.getItem("workPlan"))).subscribe(data =>{
          this.notification = new Notification(DecodedToken.id, "Work plan instruction added successfully!", NotificationType.Success, false, false, new Date());
          this.notificationService.postNotification(this.notification).subscribe();
          this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        }, error => {         
          this.notification = new Notification(DecodedToken.id, "Work plan instruction added unsuccessfully!", NotificationType.Error, false, false, new Date());
          this.notificationService.postNotification(this.notification).subscribe();
          this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        });
      }
    });

    this.submitDeviceForm.controls['device'].reset;
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
