import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User, Role } from '../../../model/user'


@Component({
  selector: 'app-adding-teams-new',
  templateUrl: './adding-teams-new.component.html',
  styleUrls: ['./adding-teams-new.component.css']
})
export class AddingTeamsNewComponent implements OnInit {

  creatingTeamForm: FormGroup;


  teamMembers = [
    new User('pepe', "pera", "peric", "", new Date(), "", "pera@gmail.com", Role.TeamMember, undefined),
    new User('m2', 'marko', 'matic', "", new Date(), "", "marko@gmail.com", Role.TeamMember, undefined),
    new User('jj', 'jole', 'jokic', "", new Date(), "", 'jole@gmail.com', Role.TeamMember, undefined),
    new User('pepe', "pera", "peric", "", new Date(), "", "pera@gmail.com", Role.TeamMember, undefined),
    new User('m2', 'marko', 'matic', "", new Date(), "", "marko@gmail.com", Role.TeamMember, undefined),
    new User('jj', 'jole', 'jokic', "", new Date(), "", 'jole@gmail.com', Role.TeamMember, undefined),
  ];

  allMembers = [
    new User('caca', "caca", "caric", "", new Date(), "", "caca@gmail.com", Role.TeamMember, undefined),
    new User('luk', 'luka', 'lukic', "", new Date(), "", "luka@gmail.com", Role.TeamMember, undefined),
    new User('tara', 'tamara', 'tatic', "", new Date(), "", 'tara@gmail.com', Role.TeamMember, undefined),
    new User('caca', "caca", "caric", "", new Date(), "", "caca@gmail.com", Role.TeamMember, undefined),
    new User('luk', 'luka', 'lukic', "", new Date(), "", "luka@gmail.com", Role.TeamMember, undefined),
    new User('tara', 'tamara', 'tatic', "", new Date(), "", 'tara@gmail.com', Role.TeamMember, undefined),
  ];

  constructor(private fb: FormBuilder, public router : Router) { }

  ngOnInit(): void {
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
    console.log(this.teamMembers);

    this.router.navigate(['/Navbar/AddingTeams']);
  }

}
