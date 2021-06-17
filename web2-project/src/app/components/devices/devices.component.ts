import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/model/address';
import {Device,DeviceType } from 'src/app/model/device';
import { DeviceService } from 'src/app/services/device.service';

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


  constructor(private formBuilder:FormBuilder, private modalService:NgbModal, private deviceService:DeviceService) { }

  ngOnInit(): void {

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
   
   

    this.addDeviceForm = this.formBuilder.group({
      //id:['', [Validators.required]],
      Name:['', [Validators.required]],
      Address:['',Validators.required],
      Tip:['', [Validators.required]],
      Lon:['', [Validators.required]],
      Lat:['', [Validators.required]]


    });
  }
  submitDevice()
  {
      var Dtype:DeviceType;
      if (this.addDeviceForm.controls['Tip'].value === '0'){
        Dtype = DeviceType.Diskonektor;
      }
      else if (this.addDeviceForm.controls['Tip'].value === '1')
      {
        Dtype = DeviceType.Osigurac;
      }
      else if (this.addDeviceForm.controls['Tip'].value === '2')
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
      this.deviceService.postDevice(dev).subscribe(data => {
       
        console.log(data);


      });
      this.modalService.dismissAll();
      this.addDeviceForm.reset();
    
  }
  



    resetFilter(){}
    FilterDevices(){}

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
