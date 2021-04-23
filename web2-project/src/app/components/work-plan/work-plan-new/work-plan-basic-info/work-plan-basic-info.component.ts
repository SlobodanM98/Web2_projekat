import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-plan-basic-info',
  templateUrl: './work-plan-basic-info.component.html',
  styleUrls: ['./work-plan-basic-info.component.css']
})
export class WorkPlanBasicInfoComponent implements OnInit {

  workPlanForm: FormGroup;
  currentDate = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.workPlanForm = this.fb.group({
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

  submitWorkPlan(){

  }

  get type(){
    return this.workPlanForm.get('type');
  }

  get address(){
    return this.workPlanForm.get('address');
  }

  get startDate(){
    return this.workPlanForm.get('startDate');
  }

  get endDate(){
    return this.workPlanForm.get('endDate');
  }

  get purpose(){
    return this.workPlanForm.get('purpose');
  }

  get notes(){
    return this.workPlanForm.get('pnotes');
  }

  get company(){
    return this.workPlanForm.get('company');
  }

  get phoneNomber(){
    return this.workPlanForm.get('phoneNomber');
  }

  get creationDate(){
    return this.workPlanForm.get('creationDate');
  }
}
