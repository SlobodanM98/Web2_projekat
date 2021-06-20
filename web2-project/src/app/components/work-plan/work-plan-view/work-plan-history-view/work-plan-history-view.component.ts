import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Device, DeviceType } from 'src/app/model/device';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { User } from 'src/app/model/user';
import { Status, WorkPlanStatusHistory } from 'src/app/model/work-plan';
import { DeviceService } from 'src/app/services/device.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

interface TableElement{
  ID: number;
  Date: string;
  ChangedBy: string;
  Status: string;
  WorkPlanID: string;
}

@Component({
  selector: 'app-work-plan-history-view',
  templateUrl: './work-plan-history-view.component.html',
  styleUrls: ['./work-plan-history-view.component.css']
})
export class WorkPlanHistoryViewComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Date', 'ChangedBy', 'Status', 'WorkPlanID'];
  dataSource: any;

  allHistory: Array<WorkPlanStatusHistory>;
  allUsers: Array<User>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private fb: FormBuilder, private deviceService: DeviceService, private workPlanService: WorkPlanService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allHistory = new Array<WorkPlanStatusHistory>();
    this.allUsers = new Array<User>();
    this.workPlanService.getWorkPlanHistoryID(Number(localStorage.getItem("workPlan"))).subscribe(data=>{
      this.allHistory = new Array<WorkPlanStatusHistory>();
      this.workPlanService.getWorkPlanHistory().subscribe(histories=>{
        data.forEach(element => {
          histories.forEach(history => {
            if(history.workPlanStatusHistoryID == element){
              this.allHistory.push(history);
            }
          });
        });

        this.userService.getUsers().subscribe(data=>{
          this.allUsers = new Array<User>();
          this.allUsers = data;
          this.loadDevices()
        });
      });
    });
  }

  loadDevices(){
    var tableElements = new Array<TableElement>();
    this.allHistory.forEach(element => {
      this.allUsers.forEach(user => {
        if(user.id === element.changedBy){
          var data : TableElement = {ID: element.workPlanStatusHistoryID, Date: element.date.toLocaleString(), ChangedBy: user.firstName + " " + user.lastName, Status: Status[element.status].toString(), WorkPlanID: element.workPlanID.toString()};
          tableElements.push(data);
        }
      });
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
