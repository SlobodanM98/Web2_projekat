import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {User, Role} from 'src/app/model/user';
import { UserService } from '../../services/user/user.service';
import { Address } from '../../model/address'
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { confirmPasswordValidator, ConfirmPasswordMatcher } from 'src/app/directives/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  newUser:User;
  imageSrc:string = '../assets/profil.png';
  allAddresses: Array<Address>;
  allUsers: Array<User>
  confirmPasswordMatcher = new ConfirmPasswordMatcher();
  selectedFile: File;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, public router : Router) { }

  ngOnInit(): void {
    this.allAddresses = new Array<Address>();

    this.userService.getAddress().subscribe(data => {
      this.allAddresses = data;
    });

    this.allUsers = new Array<User>();

    this.userService.getUsers().subscribe(data => {
      this.allUsers = data;
    });

    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required]),
        confirmPassword: new FormControl('',[Validators.required]),
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        picture: new FormControl('', [Validators.required]),
      },
      {
        validators: confirmPasswordValidator()
      }
    );

    /*this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      password2: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      name: ['', [
        Validators.required,
      ]],
      lastname: ['', [
        Validators.required,
      ]],
      dateOfBirth: ['', [
        Validators.required,
      ]],
      address: ['', [
        Validators.required,
      ]],
      role: ['', [
        Validators.required,
      ]],
      picture: ['', [
        Validators.required
      ]]
    })*/

    //this.registerForm.valueChanges.subscribe(console.log)
  }

  submitRegistration() {
    console.log("qqqq");
    var address : Address;
    address = new Address(1,"",1,"",1,1);

    this.allUsers.forEach(element => {
      if(element.username === this.registerForm.controls['username'].value || element.email ===this.registerForm.controls['email'].value) {
        return;
      }
    });

    this.allAddresses.forEach(element => {
      if(element.addressID == this.registerForm.controls['address'].value){
        address = element;
      }
    });

    var role: Role;
    switch(this.registerForm.controls['role'].value) {
      case 'Dispecer':
        role = Role.Dispatcher;
        break;
      case 'Radnik':
        role = Role.Worker;
        break;
      default:
        role = Role.TeamMember;
        break;
    }

    console.log(this.registerForm.controls);
    this.newUser = new User(this.registerForm.controls['username'].value, this.registerForm.controls['name'].value, this.registerForm.controls['lastname'].value, this.registerForm.controls['password'].value, 
    this.registerForm.controls['dateOfBirth'].value, this.registerForm.controls['address'].value, this.registerForm.controls['email'].value, role, this.selectedFile);
    console.log(this.newUser);
    this.userService.postUser(this.newUser).subscribe(
    );
    this.router.navigate(["/Login"]);
    
    //localStorage.setItem('session', JSON.stringify(this.newUser));
    
  }

  onChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }

    this.selectedFile = <File>e.target.files[0];
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get picture() {
    return this.registerForm.get('picture');
  }

}
