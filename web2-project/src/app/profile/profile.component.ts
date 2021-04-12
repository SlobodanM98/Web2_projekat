import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  editForm: FormGroup;

  imageSrc:string = '../assets/profil.png';

  ngOnInit(): void {
    this.editForm = this.fb.group({
      username: ['', [
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.email
      ]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      password2: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      name: ['', [
      ]],
      lastname: ['', [
      ]],
      dateOfBirth: ['', [
      ]],
      address: ['', [
      ]],
      role: ['', [
      ]],
      picture: ['', [
      ]]
    })
  }

  submitEdit(){

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
    return this.editForm.get('username');
  }

  get email() {
    return this.editForm.get('email');
  }

  get password() {
    return this.editForm.get('password');
  }

  get password2() {
    return this.editForm.get('password2');
  }

  get name() {
    return this.editForm.get('name');
  }

  get lastname() {
    return this.editForm.get('lastname');
  }

  get dateOfBirth() {
    return this.editForm.get('dateOfBirth');
  }

  get address() {
    return this.editForm.get('address');
  }

  get role() {
    return this.editForm.get('role');
  }

  get picture() {
    return this.editForm.get('picture');
  }
}
