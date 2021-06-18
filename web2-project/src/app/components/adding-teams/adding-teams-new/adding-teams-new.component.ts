import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User, Role } from '../../../model/user'
import { Address } from "../../../model/address"
import { UserService } from 'src/app/services/user/user.service';
import { TeamService } from 'src/app/services/team/team.service';
import { Team } from 'src/app/model/team/team.model';


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
    console.log(this.teamMembers.length);
    this.allMembers = new Array<User>();
    this.userService.getUsersTeamMembers().subscribe(data => {
      this.allMembers = data;
      console.log(this.allMembers);
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
  }//!creatingTeamForm.valid && 

  submitTeamForm() {
    //console.log(this.creatingTeamForm.controls);
    //console.log(this.teamMembers);
    var ids = Array<string> ();
    console.log(this.teamMembers);
    for(let i = 0; i < this.teamMembers.length; i++) {
      console.log(this.teamMembers[i].Id);
      ids.push(this.teamMembers[i].Id);
    }
    /*this.teamMembers.forEach(e => {
      console.log(e.Id);
      ids.push(e.Id);
    });*/
    console.log(ids);
    var newTeam = new Team(this.creatingTeamForm.controls['name'].value, ids);
    console.log(newTeam);
    /*this.teamService.postTeam(newTeam).subscribe(
      (res:any) => {
        this.router.navigate(['/Navbar/AddingTeams']);
      },
      err => {
        console.log("ERROR!!!");
      }

    );*/

    //this.router.navigate(['/Navbar/AddingTeams']);
  }

}
