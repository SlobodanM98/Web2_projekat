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
  TipDokumenta:TipDokumenta;
  PlanRada:number;
  Author:string;
}




@Component({
  selector: 'app-documents-filtered',
  templateUrl: './documents-filtered.component.html',
  styleUrls: ['./documents-filtered.component.css']
})
export class DocumentsFilteredComponent implements OnInit {

  @Input() filteredData : Array<SafetyDocument>;

  displayedColumns: string[] = ['ID','TipDokumenta', 'PlanRada','Author'];
  dataSource:any;
  tableElements: Array<TableElement>;

  editDocumentForm: FormGroup;
  deleteDocument: SafetyDocument;
  DocumentForEdit: SafetyDocument;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private documentService:DocumentService) { }

  ngOnInit(): void {
    this.editDocumentForm = this.formBuilder.group({
      TipDokumenta: ['', [
      ]],
      PlanRada: ['', [
      ]],
      Author: ['', [
      ]],
      Details: ['', [
      ]],
      Notes: ['', [
      ]],
      PhoneNum: ['', [
      ]]
    });




    this.dataSource = new MatTableDataSource();

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
      var data:TableElement = {ID:element.ID, TipDokumenta:element.Tip, PlanRada:element.PlanRada, Author:element.Author };
      this.tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
