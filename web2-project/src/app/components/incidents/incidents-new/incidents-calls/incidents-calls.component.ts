import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {Call} from 'src/app/model/call';

@Component({
  selector: 'app-incidents-calls',
  templateUrl: './incidents-calls.component.html',
  styleUrls: ['./incidents-calls.component.css']
})
export class IncidentsCallsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'callReason', 'hazard', 'comment', 'name', 'lastname'];
  dataSource: MatTableDataSource<Call>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reasons:string[] = [" Nema Struje", "Postoji Kvar","Treperenje Svetla","Povratak Struje", "Delimicna Struja","Problemi S Naponom"];

  constructor() { }

  ngOnInit(): void {
  }

}
