import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-account-basic-info',
  templateUrl: './work-account-basic-info.component.html',
  styleUrls: ['./work-account-basic-info.component.css']
})
export class WorkAccountBasicInfoComponent implements OnInit {

  workAccountForm: FormGroup;
  currentDate = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.workAccountForm = this.fb.group({
      type: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
      purpose: ['', [
        Validators.required
      ]],
      notes: ['', [
      ]],
      company: ['', [
        Validators.required
      ]],
      phoneNomber: ['', [
        Validators.required
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkAccount(){

  }

  get type(){
    return this.workAccountForm.get('type');
  }

  get address(){
    return this.workAccountForm.get('address');
  }

  get startDate(){
    return this.workAccountForm.get('startDate');
  }

  get endDate(){
    return this.workAccountForm.get('endDate');
  }

  get purpose(){
    return this.workAccountForm.get('purpose');
  }

  get notes(){
    return this.workAccountForm.get('pnotes');
  }

  get company(){
    return this.workAccountForm.get('company');
  }

  get phoneNomber(){
    return this.workAccountForm.get('phoneNomber');
  }

  get creationDate(){
    return this.workAccountForm.get('creationDate');
  }

}
