import { Component, OnInit,  Input, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkAccount, Status } from '../../../model/work-account'

export interface TableElement{
  id: string;
  startDate: Date;
  status: string;
  address: string;
}

@Component({
  selector: 'app-work-account-filtered',
  templateUrl: './work-account-filtered.component.html',
  styleUrls: ['./work-account-filtered.component.css']
})
export class WorkAccountFilteredComponent implements OnInit {

  @Input() filteredData : Array<WorkAccount>;

  displayedColumns: string[] = ['id', 'startDate', 'address', 'status'];
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
      var data : TableElement = {id: element.workAccountID.toString(), startDate: element.startDate, address: element.address.street + ' ' + element.address.number, status: Status[element.status].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
