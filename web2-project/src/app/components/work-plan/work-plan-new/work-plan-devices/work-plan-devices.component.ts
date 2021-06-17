import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device, DeviceType } from 'src/app/model/device';

interface TableElement{
  ID: number;
  Name: string;
  Type: string;
}

@Component({
  selector: 'app-work-plan-devices',
  templateUrl: './work-plan-devices.component.html',
  styleUrls: ['./work-plan-devices.component.css']
})
export class WorkPlanDevicesComponent implements OnInit {

  allDevices: Array<Device>;
  workPlanDevices: Array<Device>;
  submitDeviceForm: FormGroup;

  displayedColumns: string[] = ['ID', 'Name', 'Type'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allDevices = new Array<Device>();
    this.workPlanDevices = new Array<Device>();

    this.submitDeviceForm = this.fb.group({
      device: ['', [
        Validators.required
      ]]
    })

    this.loadDevices();
  }

  loadDevices(){
    var tableElements = new Array<TableElement>();
    this.workPlanDevices.forEach(element => {
      var data : TableElement = {ID: element.id, Name: element.name, Type: DeviceType[element.type].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  submitDevice(){
    alert("Submited.");

    this.submitDeviceForm.controls['device'].reset;
  }

}
