import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkAccountService } from '../../../../services/work-account/work-account.service';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';

@Component({
  selector: 'app-work-account-basic-info',
  templateUrl: './work-account-basic-info.component.html',
  styleUrls: ['./work-account-basic-info.component.css']
})
export class WorkAccountBasicInfoComponent implements OnInit {

  workAccountForm: FormGroup;
  currentDate = new Date();
  currentState: string = "Draft";

  constructor(private fb: FormBuilder, private workAccountService: WorkAccountService, private addToProceed: AddToProceedService) { }

  ngOnInit(): void {
    this.addToProceed.canMove = false;
    if(this.workAccountService.currentState2 !== "") {
      this.currentState = this.workAccountService.currentState2;
    }

    this.workAccountForm = this.fb.group({
      type: [this.workAccountService.currentType, [
        Validators.required
      ]],
      state: [this.currentState,[
        Validators.required
      ]],
      emergencyWork: [this.workAccountService.currentEmergencyWork, [
        
      ]],
      address: [this.workAccountService.currentAddress, [
        Validators.required
      ]],
      startDate: [this.workAccountService.currentStartDate, [
        Validators.required
      ]],
      endDate: [this.workAccountService.currentEndDate, [
        Validators.required
      ]],
      purpose: [this.workAccountService.currentPurpose, [
        Validators.required
      ]],
      notes: [this.workAccountService.currentNotes, [
      ]],
      company: [this.workAccountService.currentCompany, [
        Validators.required
      ]],
      phoneNomber: [this.workAccountService.currentPhoneNomber, [
        Validators.required
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkAccount(){
    this.addToProceed.canMove = true;
    this.addToProceed.canReturn = false;
  }

  typeChanged(e:any) {
    console.log("aaa");
    this.workAccountService.currentType = e.target.value;
  }

  stateChanged(e:any) {
    this.workAccountService.currentState2 = e.target.value;
  }

  emergencyWorkChanged(e:any) {
    this.workAccountService.currentEmergencyWork = e.target.checked;
  }

  addressChanged(e:any) {
    this.workAccountService.currentAddress = e.target.value;
  }

  startDateChanged(e:any) {
    this.workAccountService.currentStartDate = e.target.value;
  }

  endDateChanged(e:any) {
    this.workAccountService.currentEndDate = e.target.value;
  }

  companyChanged(e:any) {
    this.workAccountService.currentCompany = e.target.value;
  }

  phoneNomberChanged(e:any) {
    this.workAccountService.currentPhoneNomber = e.target.value;
  }

  purposeChanged(e:any) {
    this.workAccountService.currentPurpose = e.target.value;
  }

  notesChanged(e:any) {
    this.workAccountService.currentNotes = e.target.value;
  }

  get type(){
    return this.workAccountForm.get('type');
  }

  get state(){
    return this.workAccountForm.get('state');
  }

  get emergencyWork() {
    return this.workAccountForm.get('emergencyWork');
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
