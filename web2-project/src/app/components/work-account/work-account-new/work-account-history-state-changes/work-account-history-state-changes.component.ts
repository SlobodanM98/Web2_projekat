import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { WorkAccountService } from '../../../../services/work-account/work-account.service'

@Component({
  selector: 'app-work-account-history-state-changes',
  templateUrl: './work-account-history-state-changes.component.html',
  styleUrls: ['./work-account-history-state-changes.component.css']
})
export class WorkAccountHistoryStateChangesComponent implements OnInit {

  stateForm: FormGroup;
  currentState: string = "Draft";

  constructor(private fb: FormBuilder, private workAccountService: WorkAccountService) { }

  ngOnInit(): void {
    if(this.workAccountService.currentState !== "") {
      this.currentState = this.workAccountService.currentState;
    }
    //console.log(this.currentState)
    //this.workAccountService.changeState(this.currentState);

    this.stateForm = this.fb.group({
      state: [this.currentState, [
        Validators.required,
      ]],
    })
  }

  submitState() { 
    console.log(this.stateForm.controls);
  }

  stateChanged(e:any) {
    //console.log(e.target.value);
    this.workAccountService.currentState = e.target.value;
  }

  get state() {
    return this.stateForm.get('state');
  }

}
