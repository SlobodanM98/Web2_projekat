import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/model/device';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { InstructionStatus, WorkInstruction } from 'src/app/model/work-instruction';
import { DeviceService } from 'src/app/services/device.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

interface TableElement{
  ID: number;
  DeviceName: string;
  Status: string;
}

@Component({
  selector: 'app-work-plan-instructions',
  templateUrl: './work-plan-instructions.component.html',
  styleUrls: ['./work-plan-instructions.component.css']
})
export class WorkPlanInstructionsComponent implements OnInit {
  
  allDevices: Array<Device>;
  workPlanInstructions: Array<WorkInstruction>;
  submitInstructionForm: FormGroup;

  displayedColumns: string[] = ['ID', 'DeviceName', 'Status'];
  dataSource: any;

  notification: Notification

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private deviceService: DeviceService, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allDevices = new Array<Device>();

    this.workPlanService.getWorkPlanDevice().subscribe(data=>{
      this.deviceService.getDevices().subscribe(devices=>{
        this.allDevices = new Array<Device>();
        data.forEach(element => {
          devices.forEach(device => {
            if(device.id == element){
              this.allDevices.push(device);
            }
          });
        });
        this.loadDevices();
      });
    });

    this.workPlanInstructions = new Array<WorkInstruction>();

    this.workPlanService.getWorkPlanInstruction().subscribe(data=>{
      this.workPlanInstructions = new Array<WorkInstruction>();
      this.workPlanInstructions = data;
      console.log(data);
    });

    this.submitInstructionForm = this.fb.group({
      device: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    })
  }

  loadDevices(){
    var tableElements = new Array<TableElement>();
    this.workPlanInstructions.forEach(element => {
      var data : TableElement = {ID: element.instructionID, DeviceName: element.device.name, Status: InstructionStatus[element.status].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  submitInstruction(){
    this.deviceService.getDevices().subscribe(devices=>{
      devices.forEach(element => {
        if(element.id == this.submitInstructionForm.controls['device'].value){
          const helper = new JwtHelperService();
          var token : any = localStorage.getItem('token');
          const DecodedToken = helper.decodeToken(token);

          var instruction : WorkInstruction = new WorkInstruction(element, this.submitInstructionForm.controls['description'].value, Number(localStorage.getItem("workPlan")));
          
          this.workPlanService.postWorkPlanInstruction(instruction, Number(localStorage.getItem("workPlan"))).subscribe(data =>{
            this.notification = new Notification(DecodedToken.id, "Work plan instruction added successfully!", NotificationType.Success, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
  
            this.workPlanService.getWorkPlanDevice().subscribe(data=>{
              this.deviceService.getDevices().subscribe(devices=>{
                this.allDevices = new Array<Device>();
                data.forEach(element => {
                  devices.forEach(device => {
                    if(device.id == element){
                      this.allDevices.push(device);
                    }
                  });
                });
                this.loadDevices();
              });
            });
          }, error => {         
            this.notification = new Notification(DecodedToken.id, "Work plan instruction added unsuccessfully!", NotificationType.Error, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
          });
        }
      });
    });

    this.submitInstructionForm.controls['device'].reset;
    this.submitInstructionForm.controls['description'].reset;
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
