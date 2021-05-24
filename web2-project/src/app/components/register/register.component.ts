import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  newUser:User;
  imageSrc:string = '../assets/profil.png';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
    })

    //this.registerForm.valueChanges.subscribe(console.log)
  }

  submitRegistration() {
    console.log(this.registerForm.controls);
    this.newUser = new User(this.registerForm.controls['username'].value, this.registerForm.controls['name'].value, this.registerForm.controls['lastname'].value, this.registerForm.controls['password'].value, 
    this.registerForm.controls['dateOfBirth'].value, this.registerForm.controls['address'].value, this.registerForm.controls['email'].value, this.registerForm.controls['role'].value, this.registerForm.controls['picture'].value);
    localStorage.setItem('session', JSON.stringify(this.newUser));
    
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

  get password2() {
    return this.registerForm.get('password2');
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
