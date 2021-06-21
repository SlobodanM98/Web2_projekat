import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService } from 'src/app/services/incident.service';
import {Incident} from 'src/app/model/incident';
import { Team } from 'src/app/model/team/team.model';

@Component({
  selector: 'app-incidents-crew',
  templateUrl: './incidents-crew.component.html',
  styleUrls: ['./incidents-crew.component.css']
})
export class IncidentsCrewComponent implements OnInit {
  teamForm:FormGroup;
  allTeams:Array<Team>;
  allIncidents:Array<Incident>;
  workingIncident:any;
  selectedTeam:any;
  

  constructor(private fb:FormBuilder, private incidentService:IncidentService) { }

  ngOnInit(): void {
    this.teamForm = this.fb.group({

      team:['',[Validators.required]]

    });
    this.allTeams = new Array<Team>();
    this.allIncidents = new Array<Incident>();

    this.incidentService.getIncidents().subscribe(data => {
      this.allIncidents = new Array<Incident>();
      this.allIncidents = data;
      this.workingIncident = this.allIncidents.pop();

      this.incidentService.getTeams().subscribe(data => {
        this.allTeams = new Array<Team>();
        this.allTeams = data;
  
      });
    });

    

    


  }
  submitTeam()
  {
    
    this.selectedTeam = this.allTeams.find(team => team.teamID == this.teamForm.controls["team"].value);
    this.workingIncident.Team = this.selectedTeam;
    console.log(this.workingIncident);
    this.incidentService.putIncident(this.workingIncident).subscribe();

  }

}
