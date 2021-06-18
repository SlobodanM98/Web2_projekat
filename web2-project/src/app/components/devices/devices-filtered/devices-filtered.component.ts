import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { Address } from 'src/app/model/address';
import { DeviceService } from 'src/app/services/device.service';
import {Device,DeviceType} from  '../../../model/device';


export interface TableElement{
  ID:number;
  Name:string;
  Lon:number;
  Lat:number;
  PostalNum:number;
  City:string;
  Street:string;
  Number:number;
  Tip:string;
}

@Component({
  selector: 'app-devices-filtered',
  templateUrl: './devices-filtered.component.html',
  styleUrls: ['./devices-filtered.component.css']
})
export class DevicesFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<Device>;
  @Input() allAddresses: Array<Address>;


  displayedColumns: string[] = ['ID', 'Name', 'Tip','PostalNumber','City','Street','Number', 'Lon', 'Lat', 'Actions'];
  dataSource:any;
  tableElements:Array<TableElement>;

  editDeviceForm:FormGroup;
  deleteDeviceID:number;
  deviceForEdit:Device;

  constructor(private formBuilder:FormBuilder, private modalService: NgbModal, private deviceService:DeviceService) { }

  ngOnInit(): void {
    this.editDeviceForm = this.formBuilder.group({
      id:['',[]],
      name:['',[]],
      lon:['',[]],
      lat:['',[]],
      address: ['', [
      ]],
      Tip:['',[]]

    });
    this.dataSource = new MatTableDataSource();
   
  }

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  ngAfterViewInit()
  {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes:SimpleChange)
  {
    this.tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      var data:TableElement = {ID:element.id,Name:element.name,PostalNum:element.address.postalNumber,Street:element.address.street,Number:element.address.number,City:element.address.city,Lon:element.longCoord, Lat:element.latCoord, Tip:DeviceType[element.type].toString() };
      this.tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  edit(element:TableElement, contentEdit:any)
  {

    var type:DeviceType;

    if (element.Tip === "Transformator")
    {
      type = DeviceType.Transformator;
    }
    else if (element.Tip === "Osigurac")
    {
      type = DeviceType.Osigurac;
    }
    else if (element.Tip === "Prekidac")
    {
      type = DeviceType.Prekidac;
    }
    else {
      type = DeviceType.Diskonektor;
    }

    this.allAddresses.forEach(address => {
      if(address.city === element.City && address.number === element.Number && address.postalNumber === element.PostalNum && address.street === element.Street)
      {
        this.deviceForEdit = new Device(type, element.Name, address,element.Lon,element.Lat);
        this.deviceForEdit.id = element.ID;
      }

    });

    //this.deviceForEdit = element;
    this.modalService.open(contentEdit, {ariaLabelledBy:'modal-edit'});
  }

  delete(element:TableElement, contentDelete:any)
  {
    this.deleteDeviceID = element.ID;
    this.modalService.open(contentDelete, {ariaLabelledBy:'modal-delete'});
  }

  submitEdit()
  {
    this.modalService.dismissAll();
      for(var i = 0; i < this.tableElements.length; i++){
        if (this.tableElements[i].ID === this.deviceForEdit.id){
          if (this.editDeviceForm.controls["name"].value){
            this.deviceForEdit.name = this.editDeviceForm.controls["name"].value;
            this.tableElements[i].Name = this.editDeviceForm.controls["name"].value;
          }
          if (this.editDeviceForm.controls["lon"].value){
            this.deviceForEdit.longCoord = this.editDeviceForm.controls["lon"].value;
            this.tableElements[i].Lon = this.editDeviceForm.controls["lon"].value;
          }
          if (this.editDeviceForm.controls["lat"].value){
            this.deviceForEdit.latCoord = this.editDeviceForm.controls["lat"].value;
            this.tableElements[i].Lat = this.editDeviceForm.controls["lat"].value;
          }
          if(this.editDeviceForm.controls['address'].value){
            for(var j = 0; j < this.allAddresses.length; j++){
              if(this.allAddresses[j].addressID === Number(this.editDeviceForm.controls['address'].value)){
                this.deviceForEdit.address = this.allAddresses[j];
                //this.deviceForEdit.priority = this.allAddresses[j].priority;
  
                this.tableElements[i].City = this.allAddresses[j].city;
                this.tableElements[i].Number = this.allAddresses[j].number;
                this.tableElements[i].PostalNum = this.allAddresses[j].postalNumber;
                this.tableElements[i].Street = this.allAddresses[j].street;
                break;
              }
            };
          }


          if (this.editDeviceForm.controls["Tip"].value)
          {
            var type:DeviceType;
            if (this.editDeviceForm.controls["Tip"].value == "Prekidac"){
              type = DeviceType.Prekidac;
            }
            else if (this.editDeviceForm.controls["Tip"].value == "Osigurac"){
              type = DeviceType.Osigurac;
            }
            else if (this.editDeviceForm.controls["Tip"].value == "Transformator"){
              type = DeviceType.Transformator;
            }
            else {
              type = DeviceType.Diskonektor;
            }
            this.deviceForEdit.type = type;
            this.tableElements[i].Tip = this.editDeviceForm.controls["Tip"].value;
          }
          break;
          
        }
      }
    this.deviceService.putDevice(this.deviceForEdit).subscribe();

    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.editDeviceForm.reset();

  }

  confirmDelete()
  {
    this.modalService.dismissAll();

    this.deviceService.deleteDevice(this.deleteDeviceID).subscribe();
    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].ID === this.deleteDeviceID){
        this.tableElements.splice(i, 1);
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

}
