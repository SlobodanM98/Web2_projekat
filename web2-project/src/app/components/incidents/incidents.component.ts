import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {Incident} from 'src/app/model/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  filteredIncidents:Array<Incident>;

  role: string;

  constructor(private incidentServ:IncidentService) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.role = DecodedToken.role;

    this.filteredIncidents = new Array<Incident>();
    
    this.incidentServ.getIncidents().subscribe(res =>{
      this.filteredIncidents = new Array<Incident>();
      this.filteredIncidents = res;
      //console.log(this.filteredIncidents);
      
    });
  
    //console.log(this.filteredIncidents);

  }

}
