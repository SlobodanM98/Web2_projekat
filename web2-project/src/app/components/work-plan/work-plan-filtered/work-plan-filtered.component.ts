import { Component, OnInit, Input, ViewChild, AfterViewInit, SimpleChange, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Status, WorkPlan } from 'src/app/model/work-plan';

export interface TableElement{
  id: number;
  phone: number;
  startDate: Date;
  status: string;
  address: string;
}

@Component({
  selector: 'app-work-plan-filtered',
  templateUrl: './work-plan-filtered.component.html',
  styleUrls: ['./work-plan-filtered.component.css']
})
export class WorkPlanFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<WorkPlan>;
  @Output() workPlanClickEvent = new EventEmitter<WorkPlan>(); 

  displayedColumns: string[] = ['id', 'startDate','phone', 'status', 'address'];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes : SimpleChange){
    var tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      var data : TableElement = {id: element.workPlanID, startDate: element.startDate,phone: element.phone, status: Status[element.status].toString(), address: element.address.postalNumber + ', ' + element.address.city + ', ' + element.address.street + ' ' + element.address.number};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  workPlanClick(row: WorkPlan){
    console.log(row);
    this.workPlanClickEvent.emit(row);
  }
}
