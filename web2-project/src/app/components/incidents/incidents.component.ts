import { Component, OnInit } from '@angular/core';
import {Incident} from 'src/app/model/incident'
@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  filteredIncidents:Array<Incident>;
  constructor() { }

  ngOnInit(): void {

    this.filteredIncidents = new Array<Incident>();

  }

}
