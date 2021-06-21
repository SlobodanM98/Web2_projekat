import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafetyDocument, TipDokumenta } from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';

export interface TableElement
{
  ID:number;
  TipDokumenta:string;
  PlanRada:number;
  Author:string;
  PhoneNum:string;
  Notes:string;
  Details:string;
  DateOfCreation:Date;
  Status:string;
}




@Component({
  selector: 'app-documents-filtered',
  templateUrl: './documents-filtered.component.html',
  styleUrls: ['./documents-filtered.component.css']
})
export class DocumentsFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<SafetyDocument>;

  displayedColumns: string[] = ['ID','TipDokumenta', 'PlanRada','Author','Actions'];
  dataSource:any;
  tableElements: Array<TableElement>;

  editDocumentForm: FormGroup;
  deleteDocument: SafetyDocument;
  documentForEdit: SafetyDocument;
  deleteDocumentID:number;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private documentService:DocumentService) { }

  ngOnInit(): void {
    this.editDocumentForm = this.formBuilder.group({
      ID:['', []],
      Tip: ['', [
      ]],
      PlanRadaEdit: ['', [
      ]],
      Autor: ['', [
      ]],
      DetailsEdit: ['', [
      ]],
      NotesEdit: ['', [
      ]],
      PhoneNumEdit: ['', [
      ]]
    });




    //this.dataSource = new MatTableDataSource();

  }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit()
  {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes:SimpleChange)
  {
    
    this.tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      var data:TableElement = {ID:element.id, TipDokumenta:TipDokumenta[element.tipDokumenta].toString(), PlanRada:element.planRada, Author:element.author, PhoneNum:element.phoneNum, Details:element.details, Notes:element.notes, DateOfCreation:element.dateOfCreation, Status:element.status };
      this.tableElements.push(data);
      console.log('dataa');
      console.log(data);
    });
   
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  edit(element:TableElement, contentEdit:any)
  {
    var type:TipDokumenta;
    if (element.TipDokumenta ==="PlaniranRad"){
      type = TipDokumenta.PlaniraniRad;
    }
    else {
      type = TipDokumenta.NeplaniraniRad;
    }

    this.documentForEdit = new SafetyDocument();
    this.documentForEdit.id = element.ID;
    this.documentForEdit.tipDokumenta = type;
    this.documentForEdit.planRada = element.PlanRada;
    this.documentForEdit.notes = element.Notes;
    this.documentForEdit.details = element.Details;
    this.documentForEdit.phoneNum = element.PhoneNum;
    this.documentForEdit.dateOfCreation = element.DateOfCreation;
    this.documentForEdit.status = element.Status;
    this.documentForEdit.author = element.Author;

    this.modalService.open(contentEdit, {ariaLabelledBy:'modal-edit'});
  }


  submitEdit()
  {
    this.modalService.dismissAll();

    for (var i = 0; i < this.tableElements.length; i++)
    {
      if (this.tableElements[i].ID == this.documentForEdit.id)
      {
        if (this.editDocumentForm.controls["PlanRadaEdit"].value)
        {
          this.documentForEdit.planRada = this.editDocumentForm.controls["PlanRadaEdit"].value;
          this.tableElements[i].PlanRada = this.editDocumentForm.controls["PlanRadaEdit"].value;
        }
        if (this.editDocumentForm.controls["NotesEdit"].value)
        {
          this.documentForEdit.notes = this.editDocumentForm.controls["NotesEdit"].value;
          this.tableElements[i].Notes = this.editDocumentForm.controls["NotesEdit"].value;
        }
        if (this.editDocumentForm.controls["DetailsEdit"].value)
        {
          this.documentForEdit.details = this.editDocumentForm.controls["DetailsEdit"].value;
          this.tableElements[i].Details = this.editDocumentForm.controls["DetailsEdit"].value;
        }
        if (this.editDocumentForm.controls["PhoneNumEdit"].value)
        {
          this.documentForEdit.phoneNum = this.editDocumentForm.controls["PhoneNumEdit"].value;
          this.tableElements[i].PhoneNum = this.editDocumentForm.controls["PhoneNumEdit"].value;
        }

        if(this.editDocumentForm.controls["Tip"].value)
        {
          var type:TipDokumenta;
          if (this.editDocumentForm.controls["Tip"].value ==="PlaniranRad"){
            type = TipDokumenta.PlaniraniRad;
          }
          else {
            type = TipDokumenta.NeplaniraniRad;
          }
          this.documentForEdit.tipDokumenta = type;
          this.tableElements[i].TipDokumenta = type.toString();
        }
        break;



      }
    }
    this.documentService.putDocument(this.documentForEdit).subscribe();
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.editDocumentForm.reset();
  }

  delete(element:TableElement, contentDelete:any)
  {
    this.deleteDocumentID = element.ID;
    this.modalService.open(contentDelete, {ariaLabelledBy:'modal-delete'});
  }

  confirmDelete()
  {
    this.modalService.dismissAll();
    this.documentService.deleteDevice(this.deleteDocumentID).subscribe();
    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].ID === this.deleteDocumentID){
        this.tableElements.splice(i, 1);
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
