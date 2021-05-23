import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/model/address';
import {Device,DeviceType } from 'src/app/model/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  allDevices:Array<Device>;
  filteredDevices:Array<Device>;

  addDeviceForm: FormGroup;


  constructor(private formBuilder:FormBuilder, private modalService:NgbModal) { }

  ngOnInit(): void {

    this.allDevices = new Array<Device>();
    this.filteredDevices = new Array<Device>();


    this.addDeviceForm = this.formBuilder.group({
      id:['', [Validators.required]],
      Name:['', [Validators.required]],
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

      var a:string;
      a = 'aaa';
      var component = new Device(Dtype, this.addDeviceForm.controls['id'].value,  this.addDeviceForm.controls['Name'].value, new Address(1,'',1,'',2,2),this.addDeviceForm.controls['Lon'].value,this.addDeviceForm.controls['Lat'].value);
      console.log(component);
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
