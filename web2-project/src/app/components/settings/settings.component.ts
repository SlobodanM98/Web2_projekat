import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator, ConfirmPasswordMatcher } from 'src/app/directives/custom-validator';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  passwordForm: FormGroup;
  confirmPasswordMatcher = new ConfirmPasswordMatcher();

  priorityForm: FormGroup;
  allAddresses: Array<Address>;

  constructor() { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup(
      {
        password: new FormControl('',[Validators.required]),
        confirmPassword: new FormControl('',[Validators.required])
      },
      {
        validators: confirmPasswordValidator()
      }
    );

    this.priorityForm = new FormGroup(
      {
        address: new FormControl('',[Validators.required]),
        priority: new FormControl('',[Validators.required])
      }
    );
    this.allAddresses = new Array<Address>();
    this.allAddresses.push(new Address("Kralja Petra", 0, 1));
    this.allAddresses.push(new Address("Laze Lazarevic", 0, 1));
    this.allAddresses.push(new Address("Stojana Novakovic", 0, 1));
  }

  submitPassword(){

  }

  submitPriority(){

  }

  setValue(checked: boolean, name: string){

  }

  reset(){
    
  }
}
