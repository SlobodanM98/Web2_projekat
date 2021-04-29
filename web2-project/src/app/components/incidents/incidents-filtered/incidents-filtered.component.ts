import { Component, Input, OnInit } from '@angular/core';
import {Incident} from 'src/app/model/incident'
@Component({
  selector: 'app-incidents-filtered',
  templateUrl: './incidents-filtered.component.html',
  styleUrls: ['./incidents-filtered.component.css']
})
export class IncidentsFilteredComponent implements OnInit {

  @Input() filteredData : Array<Incident>;

  constructor() { }

  ngOnInit(): void {
   
  }

}
