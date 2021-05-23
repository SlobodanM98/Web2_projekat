import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  poruka : string;
  reportOutageForm : FormGroup;

  constructor(public router : Router, private formBuilder : FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reportOutageForm = this.formBuilder.group({
      reason: ['', [
        Validators.required
      ]],
      comment: ['', [
      ]],
      address: ['', [
        Validators.required
      ]],
      name: ['', [
      ]],
      lastName: ['', [
      ]]
    });
  }

  logIn(){
    this.router.navigate(["/Navbar"]);
  }

  openReportOutageModal(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  get reason(){
    return this.reportOutageForm.get('reason');
  }

  get comment(){
    return this.reportOutageForm.get('comment');
  }

  get address(){
    return this.reportOutageForm.get('address');
  }

  get name(){
    return this.reportOutageForm.get('name');
  }

  get lastName(){
    return this.reportOutageForm.get('lastName');
  }

  submitReport(){
    this.modalService.dismissAll();
    this.reportOutageForm.reset();
  }
}
