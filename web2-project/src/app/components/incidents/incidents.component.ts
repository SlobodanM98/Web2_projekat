import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Incident} from 'src/app/model/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  filteredIncidents:Array<Incident> = new Array<Incident>();
  constructor(private incidentServ:IncidentService) { }

  ngOnInit(): void {

    this.filteredIncidents = new Array<Incident>();
    this.incidentServ.getIncidents().subscribe(res =>{
      
      console.log(res);
    });
  
    //console.log(this.filteredIncidents);

  }

}
