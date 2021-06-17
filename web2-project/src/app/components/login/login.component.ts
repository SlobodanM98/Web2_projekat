import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/model/address';
import { Call, Reason } from 'src/app/model/call';
import { LoginData } from 'src/app/model/login-data';
import { CallService } from 'src/app/services/call.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  poruka : string;
  reportOutageForm : FormGroup;
  logInForm:FormGroup;

  allAddresses : Array<Address>;

  constructor(public router : Router, private formBuilder : FormBuilder, private modalService: NgbModal, private callService: CallService, private userService:UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allAddresses = new Array<Address>();
    this.callService.getAddress().subscribe(data => {this.allAddresses = data});

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
    this.logInForm = this.formBuilder.group({
      username:['', [
        Validators.required
      ]],
      password:['',[
       Validators.required
      ]]
    });
  }

  logIn(){
    //var mock = new LoginData("us1", "pass1");
     //console.log(mock);
    var login = new LoginData(this.logInForm.controls["username"].value, this.logInForm.controls["password"].value);
    //var login = new LoginData("dimitrije","dimitrije123");
    console.log(login);
    this.userService.postLogin(login).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(["/Navbar"]);
      },
      err => {
        if (err.status == 400)
          this.toastr.error("Incorect username or password");
        else
          console.log(err);
      }

    );
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

  get Username()
  {
    return this.logInForm.get('username');
  }

  get Password()
  {
    return this.logInForm.get('password');
  }

  submitReport(){
    this.modalService.dismissAll();

    var reason : Reason;
    switch(this.reportOutageForm.controls['reason'].value){
      case '0':
        reason = Reason.NemaStruje;
        break;
      case '1':
        reason = Reason.PostojiKvar;
        break;
      case '2':
        reason = Reason.TreperenjeSvetla;
        break;
      case '3':
        reason = Reason.PovratakStruje;
        break;
      case '4':
        reason = Reason.DelimicnaStruja;
        break;
      default:
        reason = Reason.ProblemiSNaponom;
        break;
    }

    var address : Address;
    address = new Address(1,"",1,"",1,1);

    this.allAddresses.forEach(element => {
      if(element.addressID == this.reportOutageForm.controls['address'].value){
        address = element;
      }
    });

    var name, lastName, comment;
    
    if(this.reportOutageForm.controls['name'].value !== ''){
      name = this.reportOutageForm.controls['name'].value;
    }else{
      name = undefined;
    }

    if(this.reportOutageForm.controls['lastName'].value !== ''){
      lastName = this.reportOutageForm.controls['lastName'].value;
    }else{
      lastName = undefined;
    }

    if(this.reportOutageForm.controls['comment'].value !== ''){
      comment = this.reportOutageForm.controls['comment'].value;
    }else{
      comment = undefined;
    }

    var call = new Call(reason, address.priority, address, name, lastName, comment);

    this.callService.postCall(call).subscribe();

    this.reportOutageForm.reset();
  }
}
