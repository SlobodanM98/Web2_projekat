import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafetyDocument, TipDokumenta } from 'src/app/model/safety-document';

export interface TableElement
{
  TipDokumenta:TipDokumenta;
  PlanRada:string;
}




@Component({
  selector: 'app-documents-filtered',
  templateUrl: './documents-filtered.component.html',
  styleUrls: ['./documents-filtered.component.css']
})
export class DocumentsFilteredComponent implements OnInit {

  @Input() filteredData : Array<SafetyDocument>;

  displayedColumns: string[] = ['Author','TipDokumenta', 'PlanRada'];
  dataSource:any;
  tableElements: Array<SafetyDocument>;

  editDocumentForm: FormGroup;
  deleteDocument: SafetyDocument;
  DocumentForEdit: SafetyDocument;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal) { }

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

}
