import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User, Role } from '../../../model/user'
import { Address } from "../../../model/address"


@Component({
  selector: 'app-adding-teams-new',
  templateUrl: './adding-teams-new.component.html',
  styleUrls: ['./adding-teams-new.component.css']
})
export class AddingTeamsNewComponent implements OnInit {
  creatingTeamForm: FormGroup;
  teamMembers: Array<User>;
  allMembers: Array<User>;


  constructor(private fb: FormBuilder, public router : Router) { }

  ngOnInit(): void {
    this.teamMembers = new Array<User>();
    this.allMembers = new Array<User>();
    this.creatingTeamForm = this.fb.group({
      id: [''],
      name: [''],
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
    console.log(this.creatingTeamForm.controls);
    //console.log(this.teamMembers);

    this.router.navigate(['/Navbar/AddingTeams']);
  }
  

}
