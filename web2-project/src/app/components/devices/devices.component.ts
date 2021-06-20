import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import {Device,DeviceType } from 'src/app/model/device';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';
import { DeviceService } from 'src/app/services/device.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  allDevices:Array<Device>;
  filteredDevices:Array<Device>;
  allAddresses:Array<Address>;
  addDeviceForm: FormGroup;
  searchDeviceForm:FormGroup;

  notification: Notification;
  role: string;

  constructor(private formBuilder:FormBuilder, private modalService:NgbModal, private deviceService:DeviceService, private notificationService: NotificationService, private toastr : ToastrService) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.role = DecodedToken.role;

    this.allDevices = new Array<Device>();
    this.filteredDevices = new Array<Device>();
    this.deviceService.getDevices().subscribe(data => 
    {
      this.allDevices = new Array<Device>();
      this.filteredDevices = new Array<Device>();
      this.allDevices = data;
      //console.log(this.allDevices);
      this.allDevices.forEach(element => 
        {
          this.filteredDevices.push(element);
        
        });
      //console.log(this.filteredDevices);
    });
    //console.log(this.allDevices);
    //console.log(this.filteredDevices);
    
    
    this.allAddresses = new Array<Address>();
    this.deviceService.getAddress().subscribe(data => 
    {
      this.allAddresses = new Array<Address>();
      this.allAddresses = data;
    });
   
    this.searchDeviceForm = this.formBuilder.group({
      ID:['', []],
      Name:['', []],
      Address:['',[]],
      Tip:['', []],
      Lon:['', []],
      Lat:['', []]


    });

    this.addDeviceForm = this.formBuilder.group({
      //id:['', [Validators.required]],
      Name:['', [Validators.required]],
      Address:['',Validators.required],
      Tip:['', [Validators.required]],
      Lon:['', [Validators.required]],
      Lat:['', [Validators.required]]


    });
  }

  filterDevices(contentFilter:any)
  {

    this.modalService.open(contentFilter, {ariaLabelledBy:'modal-edit'});

    
  }
  searchDevice(){
    this.filteredDevices = this.allDevices;
    var Dtype:DeviceType;
    if (this.searchDeviceForm.controls['Tip'].value)
    {
      
      var Dtype:DeviceType;
      if (this.searchDeviceForm.controls['Tip'].value === 'Diskonektor'){
        Dtype = DeviceType.Diskonektor;
      }
      else if (this.searchDeviceForm.controls['Tip'].value === 'Osigurac')
      {
        Dtype = DeviceType.Osigurac;
      }
      else if (this.searchDeviceForm.controls['Tip'].value === 'Transformator')
      {
        Dtype = DeviceType.Prekidac;
      }
      else 
      {
        Dtype = DeviceType.Transformator;
      }
      this.filteredDevices = this.filteredDevices.filter(s => (s.type === Dtype));
    }
    if (this.searchDeviceForm.controls["ID"].value)
    {
      this.filteredDevices = this.filteredDevices.filter(s => (s.id === this.searchDeviceForm.controls["ID"].value));
    }
    if (this.searchDeviceForm.controls["Address"].value)
    {
      this.filteredDevices = this.filteredDevices.filter( s => (s.address === this.searchDeviceForm.controls["Address"].value));
    }

    if (this.searchDeviceForm.controls["Name"].value)
    {
      this.filteredDevices = this.filteredDevices.filter(s => ( s.name === this.searchDeviceForm.controls["Name"].value));
    }

    if (this.searchDeviceForm.controls["Lon"].value)
    {
      this.filteredDevices = this.filteredDevices.filter(s => ( s.longCoord == this.searchDeviceForm.controls["Lon"].value));
    }

    if (this.searchDeviceForm.controls["Lat"].value)
    {
      this.filteredDevices = this.filteredDevices.filter(s => ( s.latCoord == this.searchDeviceForm.controls["Lat"].value));
    }
    this.modalService.dismissAll();
    this.searchDeviceForm.reset();
  }


  submitDevice()
  {
      var Dtype:DeviceType;
      if (this.addDeviceForm.controls['Tip'].value === 'Diskonektor'){
        Dtype = DeviceType.Diskonektor;
      }
      else if (this.addDeviceForm.controls['Tip'].value === 'Osigurac')
      {
        Dtype = DeviceType.Osigurac;
      }
      else if (this.addDeviceForm.controls['Tip'].value === 'Transformator')
      {
        Dtype = DeviceType.Prekidac;
      }
      else 
      {
        Dtype = DeviceType.Transformator;
      }
      var address : Address;
      address = new Address(1,"",1,"",1,1);

      this.allAddresses.forEach(element => {
        if(element.addressID == this.addDeviceForm.controls['Address'].value){
         address = element;
        }
      });
      var a:string;
      a = 'aaa';
      var dev = new Device(Dtype, this.addDeviceForm.controls['Name'].value, address,Number(this.addDeviceForm.controls['Lon'].value),Number(this.addDeviceForm.controls['Lat'].value));
      console.log(dev);
      this.deviceService.postDevice(dev).subscribe(data=>{
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
        
        this.notification = new Notification(DecodedToken.id, "Device created successfully!", NotificationType.Success, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      }, error => {
        const helper = new JwtHelperService();
        var token : any = localStorage.getItem('token');
        const DecodedToken = helper.decodeToken(token);
        
        this.notification = new Notification(DecodedToken.id, "Device created unsuccessfully!", NotificationType.Error, false, false, new Date());
        this.notificationService.postNotification(this.notification).subscribe();
        this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
      });
      this.modalService.dismissAll();
      this.addDeviceForm.reset();
    
  }
  
  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

    resetFilter(){

      this.ngOnInit();
      
    }
    //FilterDevices(){}

    get id()
    {
      return this.addDeviceForm.get('id');
    }
    get Name()
    {
      return this.addDeviceForm.get('Name'); 
    }
    get Tip()
    {
      return this.addDeviceForm.get('Tip');
    }
    get Lon()
    {
      return this.addDeviceForm.get('Lon');
    }
    get Lat()
    {
      return this.addDeviceForm.get('Lat');
    }

    openAddDeviceModal(content:any)
    {
      this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'});
    }
}
