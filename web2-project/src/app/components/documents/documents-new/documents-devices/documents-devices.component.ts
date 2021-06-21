import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Device, DeviceType } from 'src/app/model/device';
import { SafetyDocument } from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';

interface TableElement{
  ID: number;
  Name: string;
  Type: string;
}

@Component({
  selector: 'app-documents-devices',
  templateUrl: './documents-devices.component.html',
  styleUrls: ['./documents-devices.component.css']
})
export class DocumentsDevicesComponent implements OnInit {

  selectedDevice:Device;
  allDevices: Array<Device>;
  allDocuments:Array<SafetyDocument>;
  DocumentDevices:Array<Device>;
  workingDocument:any;

  displayedColumns: string[] = ['ID', 'Name', 'Type'];
  dataSource: any;
  ModalDataSource:any;
  submitDeviceForm:FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private documentService:DocumentService, private modalService:NgbModal) { }

  ngOnInit(): void {

    this.documentService.getDocuments().subscribe(data => {
      this.allDocuments = new Array<SafetyDocument>();
      this.allDocuments = data;
      this.workingDocument = this.allDocuments.pop();

      this.allDevices = new Array<Device>();
      this.documentService.getDevices().subscribe(data => {
        this.allDevices = new Array<Device>();
        this.allDevices= data;

        this.DocumentDevices = new Array<Device>();
        this.documentService.getDocumentDevices(this.workingDocument.id).subscribe(data => {

          this.DocumentDevices = new Array<Device>();
          this.DocumentDevices = data;


          var tableElements = new Array<TableElement>();
    
          this.DocumentDevices.forEach(element => {
          var data : TableElement = {ID: element.id, Name: element.name, Type: DeviceType[element.type].toString()};
          tableElements.push(data);

        });
        this.dataSource = new MatTableDataSource(tableElements);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });


      });


    });




    this.submitDeviceForm = this.fb.group({
      device: ['', [Validators.required]]
    });
  }

  submitDevice(){

    
      this.documentService.postDocumentDevice(this.workingDocument.id, this.submitDeviceForm.controls["device"].value).subscribe();
      this.submitDeviceForm.reset();
   
   

    //this.submitDeviceForm.controls['device'].reset;
  }
  addDevice(contentModal:any){
    this.modalService.open(contentModal,{ariaLabelledBy:'modal-edit'})

  }

}
