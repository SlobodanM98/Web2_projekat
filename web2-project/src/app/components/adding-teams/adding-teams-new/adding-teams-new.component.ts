import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User, Role } from '../../../model/user'
import { Address } from "../../../model/address"
import { UserService } from 'src/app/services/user/user.service';
import { TeamService } from 'src/app/services/team/team.service';
import { Team, TeamUser } from 'src/app/model/team/team.model';


@Component({
  selector: 'app-adding-teams-new',
  templateUrl: './adding-teams-new.component.html',
  styleUrls: ['./adding-teams-new.component.css']
})
export class AddingTeamsNewComponent implements OnInit {

  creatingTeamForm: FormGroup;
  teamMembers: Array<User>;
  allMembers: Array<User>;


  constructor(private fb: FormBuilder, public router : Router, private userService : UserService, private teamService: TeamService) { }

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
        this.router.navigate(['/Navbar/AddingTeams']);
      },
      err => {
        console.log("ERROR!!!");
      }

    );

    //this.router.navigate(['/Navbar/AddingTeams']);
  }

}
