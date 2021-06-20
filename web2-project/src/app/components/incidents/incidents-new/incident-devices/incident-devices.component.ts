import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device, DeviceType } from 'src/app/model/device';
import { Incident } from 'src/app/model/incident';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidentService } from 'src/app/services/incident.service';

interface TableElement{
  ID: number;
  Name: string;
  Type: string;
}

@Component({
  selector: 'app-incident-devices',
  templateUrl: './incident-devices.component.html',
  styleUrls: ['./incident-devices.component.css']
})
export class IncidentDevicesComponent implements OnInit {

  allDevices: Array<Device>;
  incidentDevices: Array<Device>;
  incidentDevicesClone:Array<Device>;
  workingIncident:any;
  allIncidents:Array<Incident>;
  allIncidentsClone:Array<Incident>;
  allDevicesClone:Array<Device>;
  workingIncidentID:number;
  //submitDeviceForm: FormGroup;

  selectedDevice:Device;

  displayedColumns: string[] = ['ID', 'Name', 'Type'];
  dataSource: any;
  ModalDataSource:any;
  submitDeviceForm:FormGroup;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private incidentService:IncidentService, private modalService:NgbModal) { }

  ngOnInit():void {
    this.allDevices = new Array<Device>();
    this.allIncidents = new Array<Incident>();
    this.allIncidentsClone = new Array<Incident>();
    this.allDevicesClone = new Array<Device>();

   


    this.incidentService.getIncidents().subscribe(data => {
      this.allIncidents = new Array<Incident>();
      this.allIncidents = data;
      this.workingIncident = this.allIncidents.pop();     
      console.log(this.workingIncident);

      this.allDevices = new Array<Device>();
      this.incidentService.getDevices().subscribe(data => {

        this.allDevices = new Array<Device>();
        this.allDevices = data;

        this.allDevices.forEach(element => this.allDevicesClone.push(element));

        this.incidentDevices = new Array<Device>();
        console.log(this.workingIncident);
        this.incidentService.getIncidentDevices(this.workingIncident.id).subscribe(data =>
        {
          this.incidentDevices = new Array<Device>();
          this.incidentDevices = data;
    
          //this.incidentDevices.forEach(element => this.incidentDevicesClone.push(element));

          var tableElements = new Array<TableElement>();
    
          this.incidentDevices.forEach(element => {
          var data : TableElement = {ID: element.id, Name: element.name, Type: DeviceType[element.type].toString()};
          tableElements.push(data);
        });
          this.dataSource = new MatTableDataSource(tableElements);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        });
      
    });


    });
   

  
    //this.workPlanDevices = new Array<Device>();
    
    this.submitDeviceForm = this.fb.group({
      device: ['', [
        Validators.required
      ]]
    });
    
    //this.loadDevices();
  }


  submitDevice(){

    if (!this.incidentDevices.includes(this.submitDeviceForm.controls["device"].value))
    {
      this.incidentService.postIncidentDevice(this.workingIncident.id, this.submitDeviceForm.controls["device"].value).subscribe();
      this.submitDeviceForm.reset();
    }
    else {
      console.log("already contains that device");
    }
   

    //this.submitDeviceForm.controls['device'].reset;
  }

  addDevice(contentModal:any){
    this.modalService.open(contentModal,{ariaLabelledBy:'modal-edit'})

  }

}


