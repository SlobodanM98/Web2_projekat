import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  filterForm:FormGroup;
  token:any;
  userID:string;
  allIncidents:Array<Incident>;
  constructor(private incidentServ:IncidentService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.filteredIncidents = new Array<Incident>();
    this.allIncidents = new Array<Incident>();
    
    this.incidentServ.getIncidents().subscribe(res =>{
      this.allIncidents = new Array<Incident>();
      this.allIncidents = res;
      this.filteredIncidents = new Array<Incident>();
      this.filteredIncidents = res;
      //console.log(this.filteredIncidents);
      
    });

    this.filterForm = this.fb.group({
      IncidentsFilterOption:['', []]
    });

    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    console.log(DecodedToken);
    this.userID = DecodedToken.id;
  
    //console.log(this.filteredIncidents);

  }
  filterIncidents()
  {
   // this.filteredDocuments = this.allDocuments;
   if (this.filterForm.controls["IncidentsFilterOption"].value == "showMine"){
     this.filteredIncidents = this.allIncidents.filter(x => x.userID == this.userID);
   }
   else {
    this.filteredIncidents = this.allIncidents;
   }
    
  }

}
