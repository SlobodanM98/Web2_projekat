import { Component, OnInit, Input, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Team, TeamUser } from '../../model/team/team.model'
import { User } from '../../model/user'
import { TeamService } from 'src/app/services/team/team.service';
import { UserService } from 'src/app/services/user/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

export interface TableElement
{
  id:number;
  name:string;
  members:number;
  teamUsers: Array<string>
}

@Component({
  selector: 'app-adding-teams',
  templateUrl: './adding-teams.component.html',
  styleUrls: ['./adding-teams.component.css']
})
export class AddingTeamsComponent implements OnInit, AfterViewInit {

  allTeams: Array<Team>;
  teams: Array<TableElement>;
  displayedColumns: string[] = ['id', 'name', 'members', 'action'];
  dataSource: any;
  deleteTeam:TableElement;

  creatingTeamForm: FormGroup;

  teamMembers: Array<User>;
  allMembers: Array<User>;

  closeResult = '';
  id: number;
  name: string;
  view = 'View';

  role: string;
  notification: Notification;

  constructor(private modalService: NgbModal, private teamService: TeamService, private userService: UserService, private fb: FormBuilder, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.role = DecodedToken.role;

    this.teams = new Array<TableElement>();
    this.allTeams = new Array<Team>();
    this.teamService.getTeams().subscribe(data => {
      this.allTeams = data;
      this.allTeams.forEach(element => {
        var teamU = new Array<string>();
        element.teamUsers.forEach(tu => {
          if(element.teamID === tu.teamID) {
            teamU.push(tu.userID);
          }
        });
        var data2: TableElement = {id: element.teamID, name: element.name, members: element.teamUsers.length, teamUsers: teamU}
        this.teams.push(data2);
      })
      this.dataSource = new MatTableDataSource(this.teams);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.teamMembers = new Array<User>();
    this.allMembers = new Array<User>();
    this.userService.getUsersTeamMembers().subscribe(data => {
      this.allMembers = data;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewEditTeam(content:any, t: TableElement, view: string) {
    this.view = view;
    this.id = t.id;
    this.name = t.name;
    this.creatingTeamForm = this.fb.group({
      name: [t.name, [Validators.required]],
    });
    this.teamMembers = new Array<User>();
    t.teamUsers.forEach(e => {
      var user = this.allMembers.find(m => m.id === e);
      const index: number = this.allMembers.indexOf(user!);
      if (index !== -1) {
        this.allMembers.splice(index, 1);
      }    
      this.teamMembers.push(user!);
    });


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result : any) => {
      this.closeResult = `Closed with: ${result}`;
      if(view !== 'View') {
        var team = this.allTeams.find(e => e.teamID === this.id);
        team!.name = this.creatingTeamForm.controls['name'].value;
        var newTeamUsers = new Array<TeamUser>();
        this.teamMembers.forEach(e=>{
          var tu = new TeamUser(e.id);
          tu.teamID = team!.teamID;
          newTeamUsers.push(tu);
        });
        team!.teamUsers = newTeamUsers;
        this.teamService.putTeam(team!).subscribe(
          (res:any) => {
            this.teams.forEach(element => {
              if(element.id === t.id) {
                element.name = this.creatingTeamForm.controls['name'].value;
                console.log(this.name);
                element.members = newTeamUsers.length;
                element.teamUsers = new Array<string>();
                newTeamUsers.forEach(e => {
                  element.teamUsers.push(e.userID);
                });
              }
            });

            const helper = new JwtHelperService();
            var token : any = localStorage.getItem('token');
            const DecodedToken = helper.decodeToken(token);
      
            this.notification = new Notification(DecodedToken.id, "Team updated successfully!", NotificationType.Success, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
          },
          err => {
            const helper = new JwtHelperService();
            var token : any = localStorage.getItem('token');
            const DecodedToken = helper.decodeToken(token);
      
            this.notification = new Notification(DecodedToken.id, "Team updated unsuccessfully!", NotificationType.Error, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
            console.log("ERROR!!!");
          }
        );
      }
      else {
        console.log('View');
      }
      this.teamMembers.forEach(e => {
        this.allMembers.push(e);
      });
      this.teamMembers = new Array<User>();
    }, (reason : any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.teamMembers.forEach(e => {
        this.allMembers.push(e);
      });
      this.teamMembers = new Array<User>();
    });
  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(element: TableElement, contentDelete: any){
    this.deleteTeam = element;
    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-delete'});
  }

  deleteTeamConfirm() {
    this.modalService.dismissAll();
    this.teamService.deleteTeam(this.deleteTeam.id).subscribe(
      (res:any) => {
        var newList = new Array<TableElement>();
        this.teams.forEach(element => {
          if(element.id != this.deleteTeam.id) {
           newList.push(element);
          }
        });
        this.teams = newList;
        this.dataSource = new MatTableDataSource(newList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

            const helper = new JwtHelperService();
            var token : any = localStorage.getItem('token');
            const DecodedToken = helper.decodeToken(token);
      
            this.notification = new Notification(DecodedToken.id, "Team deleted successfully!", NotificationType.Success, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      },
      err => {
            const helper = new JwtHelperService();
            var token : any = localStorage.getItem('token');
            const DecodedToken = helper.decodeToken(token);
      
            this.notification = new Notification(DecodedToken.id, "Team deleted unsuccessfully!", NotificationType.Error, false, false, new Date());
            this.notificationService.postNotification(this.notification).subscribe();
            this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        console.log("ERROR!!!");
      }
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
