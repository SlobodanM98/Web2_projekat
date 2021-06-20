import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User, Role } from '../../../model/user'
import { Address } from "../../../model/address"
import { UserService } from 'src/app/services/user/user.service';
import { TeamService } from 'src/app/services/team/team.service';
import { Team, TeamUser } from 'src/app/model/team/team.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-adding-teams-new',
  templateUrl: './adding-teams-new.component.html',
  styleUrls: ['./adding-teams-new.component.css']
})
export class AddingTeamsNewComponent implements OnInit {

  creatingTeamForm: FormGroup;
  teamMembers: Array<User>;
  allMembers: Array<User>;

  notification: Notification;

  constructor(private fb: FormBuilder, public router : Router, private userService : UserService, private teamService: TeamService, private notificationService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.teamMembers = new Array<User>();
    this.allMembers = new Array<User>();
    this.userService.getUsersTeamMembers().subscribe(data => {
      this.allMembers = data;
    });
    this.creatingTeamForm = this.fb.group({
      name: ['', [Validators.required]],
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  submitTeamForm() {
    var newTeamUsers = new Array<TeamUser>();
   this.teamMembers.forEach(e=>{
    var tu = new TeamUser(e.id);
    newTeamUsers.push(tu);
   });

    var newTeam = new Team(this.creatingTeamForm.controls['name'].value, newTeamUsers);
    console.log(newTeam);
    this.teamService.postTeam(newTeam).subscribe(
      (res:any) => {
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
      
        this.notification = new Notification(DecodedToken.id, "Team created successfully!", NotificationType.Success, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        this.router.navigate(['/Navbar/AddingTeams']);
      },
      error => {
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
      
        this.notification = new Notification(DecodedToken.id, "Team created unsuccessfully!", NotificationType.Error, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        console.log("ERROR!!!");
      }

    );

    //this.router.navigate(['/Navbar/AddingTeams']);
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
