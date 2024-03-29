import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { Role, User } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private notificationService: NotificationService, private toastr : ToastrService) { }

  editForm: FormGroup;
  token: any;
  currentUser: User;
  userAddress: Address;
  pictureSelected: boolean;
  selectedFile: File;

  notification: Notification;

  allAddresses: Array<Address>;

  imageSrc:string = '../../../assets/profil.png';

  ngOnInit(): void {
    this.pictureSelected = false;
    this.allAddresses = new Array<Address>();

    this.userService.getAddresses().subscribe(data =>{
      this.allAddresses = new Array<Address>();
      this.allAddresses = data;
    });

    this.editForm = this.fb.group({
      username: ['', [
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.email
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
    });

    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    this.userService.getUser(DecodedToken.id).subscribe(data =>{
      this.currentUser = data;
      this.userService.getAddress(this.currentUser.addressID).subscribe(address =>{
        this.userAddress = address;
      });
    });
  }

  submitEdit(){
    var input : boolean = false;
    var user : User = this.currentUser;
    if(this.editForm.controls['username'].value != ""){
      user.userName = this.editForm.controls['username'].value;
      input = true;
    }
    if(this.editForm.controls['email'].value != ""){
      user.email = this.editForm.controls['email'].value;
      input = true;
    }
    if(this.editForm.controls['name'].value != ""){
      user.firstName = this.editForm.controls['name'].value;
      input = true;
    }
    if(this.editForm.controls['lastname'].value != ""){
      user.lastName = this.editForm.controls['lastname'].value;
      input = true;
    }
    if(this.editForm.controls['dateOfBirth'].value != ""){
      user.birthDate = this.editForm.controls['dateOfBirth'].value;
      input = true;
    }
    if(this.editForm.controls['role'].value != ""){
      user.role = this.editForm.controls['role'].value;
      input = true;
    }
    if(this.editForm.controls['address'].value != ""){
      user.addressID = this.editForm.controls['address'].value;
      input = true;
    }
    if(this.editForm.controls['picture'].value != ""){
      user.selecetdFile = this.selectedFile;
      input = true;
    }

    if(input){
      this.userService.putUser(user).subscribe(data =>{
        this.notification = new Notification(user.id, "User changed successfully!", NotificationType.Success, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
        this.userService.setUser(user);
      }, error => {
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
        
        this.notification = new Notification(DecodedToken.id, "User changed unsuccessfully!", NotificationType.Error, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      });
    }
  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  hasInput(){
    if(this.editForm.controls['username'].value || this.editForm.controls['email'].value 
      || this.editForm.controls['name'].value || this.editForm.controls['lastname'].value
        || this.editForm.controls['dateOfBirth'].value || this.editForm.controls['role'].value 
          || this.editForm.controls['picture'].value || this.editForm.controls['address'].value){
            return true;
    }else{
      return false;
    }
  }

  onChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      this.pictureSelected = true;
      this.selectedFile = <File>e.target.files[0];
    }
  }

  get username() {
    return this.editForm.get('username');
  }

  get email() {
    return this.editForm.get('email');
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
