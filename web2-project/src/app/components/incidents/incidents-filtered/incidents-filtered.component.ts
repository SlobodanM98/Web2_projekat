import { AfterViewInit, SimpleChange, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import {IncidentType, Incident} from 'src/app/model/incident'


export interface TableElement
{
  id:number;
  startDate:Date;
  status:string;
  ETA:string;
  ATA:string;

}

@Component({
  selector: 'app-incidents-filtered',
  templateUrl: './incidents-filtered.component.html',
  styleUrls: ['./incidents-filtered.component.css']
})


export class IncidentsFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<Incident>;

  tableElements:Array<TableElement>;
  displayedColumns:string[] = ['ID','startDate', 'status', 'ETA', 'ATA'];
  dataSource:any;

  constructor() { }

  ngOnInit(): void {
   this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes : SimpleChange)
  {

    //console.log(this.filteredData);
    this.tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      console.log(element);
      var data: TableElement = {id: element.id, startDate: element.vremeIncidenta, status: element.status, ETA:element.eta.toString(),ATA:element.ata.toString()}
      console.log(data);
      this.tableElements.push(data);
    })

    console.log(this.tableElements);

    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
