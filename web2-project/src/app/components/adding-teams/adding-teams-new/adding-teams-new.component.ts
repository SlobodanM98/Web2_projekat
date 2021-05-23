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


  teamMembers = [
    new User(1,'pepe', "pera", "peric", "", new Date(), new Address(1,"", 1,"",1, 1), "pera@gmail.com", Role.TeamMember, undefined),
    new User(2,'m2', 'marko', 'matic', "", new Date(), new Address(1,"", 1,"",1, 1), "marko@gmail.com", Role.TeamMember, undefined),
    new User(3,'jj', 'jole', 'jokic', "", new Date(), new Address(1,"", 1,"",1, 1), 'jole@gmail.com', Role.TeamMember, undefined),
    new User(4,'pepe', "pera", "peric", "", new Date(), new Address(1,"", 1,"",1, 1), "pera@gmail.com", Role.TeamMember, undefined),
    new User(5,'m2', 'marko', 'matic', "", new Date(), new Address(1,"", 1,"",1, 1), "marko@gmail.com", Role.TeamMember, undefined),
    new User(6,'jj', 'jole', 'jokic', "", new Date(), new Address(1,"", 1,"",1, 1), 'jole@gmail.com', Role.TeamMember, undefined),
  ];

  allMembers = [
    new User(7,'caca', "caca", "caric", "", new Date(), new Address(1,"", 1,"",1, 1), "caca@gmail.com", Role.TeamMember, undefined),
    new User(8,'luk', 'luka', 'lukic', "", new Date(), new Address(1,"", 1,"",1, 1), "luka@gmail.com", Role.TeamMember, undefined),
    new User(9,'tara', 'tamara', 'tatic', "", new Date(), new Address(1,"", 1,"",1, 1), 'tara@gmail.com', Role.TeamMember, undefined),
    new User(10,'caca', "caca", "caric", "", new Date(), new Address(1,"", 1,"",1, 1), "caca@gmail.com", Role.TeamMember, undefined),
    new User(11,'luk', 'luka', 'lukic', "", new Date(), new Address(1,"", 1,"",1, 1), "luka@gmail.com", Role.TeamMember, undefined),
    new User(12,'tara', 'tamara', 'tatic', "", new Date(), new Address(1,"", 1,"",1, 1), 'tara@gmail.com', Role.TeamMember, undefined),
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
