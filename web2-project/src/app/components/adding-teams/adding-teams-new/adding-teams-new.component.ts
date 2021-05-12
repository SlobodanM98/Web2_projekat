import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { User } from '../../../model/user'


@Component({
  selector: 'app-adding-teams-new',
  templateUrl: './adding-teams-new.component.html',
  styleUrls: ['./adding-teams-new.component.css']
})
export class AddingTeamsNewComponent implements OnInit {

  creatingTeamForm: FormGroup;

  teamMembers = [
    new User('pepe', "pera", "peric", "pera@gmail.com"),
    new User('m2', 'marko', 'matic', "marko@gmail.com"),
    new User('jj', 'jole', 'jokic', 'jole@gmail.com'),
    new User('pepe', "pera", "peric", "pera@gmail.com"),
    new User('m2', 'marko', 'matic', "marko@gmail.com"),
    new User('jj', 'jole', 'jokic', 'jole@gmail.com'),
  ];

  allMembers = [
    new User('caca', "caca", "caric", "caca@gmail.com"),
    new User('luk', 'luka', 'lukic', "luka@gmail.com"),
    new User('tara', 'tamara', 'tatic', 'tara@gmail.com'),
    new User('caca', "caca", "caric", "caca@gmail.com"),
    new User('luk', 'luka', 'lukic', "luka@gmail.com"),
    new User('tara', 'tamara', 'tatic', 'tara@gmail.com'),
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
