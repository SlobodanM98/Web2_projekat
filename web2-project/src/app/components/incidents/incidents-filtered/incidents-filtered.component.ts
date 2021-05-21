import { SimpleChange, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IncidentType, Incident} from 'src/app/model/incident'


export interface TableElement
{
  id:string;
  startDate:string;
  status:string;
}

@Component({
  selector: 'app-incidents-filtered',
  templateUrl: './incidents-filtered.component.html',
  styleUrls: ['./incidents-filtered.component.css']
})


export class IncidentsFilteredComponent implements OnInit {

  @Input() filteredData : Array<Incident>;

  displayedColumns:string[] = ['ID','startDate','phoneNum', 'status'];
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
    var tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      var data: TableElement = {id: element.ID, startDate: element.VremeIncidenta, status: element.Status}
      tableElements.push(data);
    })

    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
