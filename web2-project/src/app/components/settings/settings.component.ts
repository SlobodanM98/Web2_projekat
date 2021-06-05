import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator, ConfirmPasswordMatcher } from 'src/app/directives/custom-validator';
import { Address } from 'src/app/model/address';
import { Settings } from 'src/app/model/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  passwordForm: FormGroup;
  confirmPasswordMatcher = new ConfirmPasswordMatcher();

  priorityForm: FormGroup;
  allAddresses: Array<Address>;

  constructor(private settingsService: SettingsService) { }

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
    
    this.settingsService.getAddress().subscribe(data => {
      this.allAddresses = data;
    });

    this.settings = new Settings();

    this.settingsService.getSettings().subscribe(data => {
      this.settings = data;
    });
  }

  submitPassword(){

  }

  submitPriority(){
    var address : Address;
    address = new Address(1,"",1,"",1,1);

    this.allAddresses.forEach(element => {
      if(element.addressID === Number(this.priorityForm.controls['address'].value)){
        address = element;
      }
    });

    address.priority = Number(this.priorityForm.controls['priority'].value);

    this.settingsService.putAddress(address).subscribe();
  }

  setValue(checked: boolean, name: string){
    switch(name){
      case "success":
        this.settings.successEnabled = checked;
        break;
      case "error":
        this.settings.errorEnabled = checked;
        break;
      case "info":
        this.settings.infoEnabled = checked;
        break;
      case "warning":
        this.settings.warningEnabled = checked;
        break;
      case "showFields":
        this.settings.showFields = checked;
        break;
    }

    this.settingsService.putSettings(this.settings).subscribe();
  }

  reset(){
    this.settings.successEnabled = true;
    this.settings.errorEnabled = true;
    this.settings.infoEnabled = true;
    this.settings.warningEnabled = true;
    this.settings.showFields = true;

    this.settingsService.putSettings(this.settings).subscribe();
  }
}
