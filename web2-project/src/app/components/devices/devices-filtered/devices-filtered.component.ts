import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Device,DeviceType} from  '../../../model/device';


export interface TableElement{
  ID:number;
  Name:string;
  Lon:number;
  Lat:number;
  Tip:string;
}

@Component({
  selector: 'app-devices-filtered',
  templateUrl: './devices-filtered.component.html',
  styleUrls: ['./devices-filtered.component.css']
})
export class DevicesFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<Device>;
  displayedColumns: string[] = ['ID', 'Name', 'Tip', 'Lon', 'Lat'];
  dataSource:any;
  tableElements:Array<TableElement>;

  editDeviceForm:FormGroup;
  deleteDevice:Device;
  deviceForEdit:Device;

  constructor(private formBuilder:FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editDeviceForm = this.formBuilder.group({
      id:['',[]],
      name:['',[]],
      lon:['',[]],
      lat:['',[]],
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
      var data:TableElement = {ID:element.ID,Name:element.Name, Lon:element.LongCoord, Lat:element.LatCoord, Tip:DeviceType[element.Type].toString() };
    });
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  edit(element:Device, contentEdit:any)
  {
    this.deviceForEdit = element;
    this.modalService.open(contentEdit, {ariaLabelledBy:'modal-edit'});
  }

  delete(element:Device, contentDelete:any)
  {
    this.deleteDevice = element;
    this.modalService.open(contentDelete, {ariaLabelledBy:'modal-delete'});
  }

  submitEdit()
  {

  }

  confirmDelete()
  {
    
  }

}
