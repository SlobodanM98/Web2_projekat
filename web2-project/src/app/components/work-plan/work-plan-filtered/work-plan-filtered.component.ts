import { Component, OnInit, Input, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Status, WorkPlan } from 'src/app/model/work-plan';

export interface TableElement{
  id: string;
  startDate: Date;
  status: string;
}

@Component({
  selector: 'app-work-plan-filtered',
  templateUrl: './work-plan-filtered.component.html',
  styleUrls: ['./work-plan-filtered.component.css']
})
export class WorkPlanFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<WorkPlan>;

  displayedColumns: string[] = ['id', 'startDate', 'status'];
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
      var data : TableElement = {id: element.id, startDate: element.startDate, status: Status[element.status].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
