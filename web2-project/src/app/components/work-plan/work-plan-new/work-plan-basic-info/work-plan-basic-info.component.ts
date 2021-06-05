import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/model/address';
import { Call } from 'src/app/model/call';
import { Device } from 'src/app/model/device';
import { Incident, IncidentType } from 'src/app/model/incident';
import { Team } from 'src/app/model/team/team.model';
import { User } from 'src/app/model/user';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';

@Component({
  selector: 'app-work-plan-basic-info',
  templateUrl: './work-plan-basic-info.component.html',
  styleUrls: ['./work-plan-basic-info.component.css']
})
export class WorkPlanBasicInfoComponent implements OnInit {

  workPlanForm: FormGroup;
  currentDate = new Date();

  allAddresses: Array<Address>;
  allIncidents: Array<Incident>;
  allTeams: Array<Team>;

  constructor(private fb: FormBuilder, private addToProceed: AddToProceedService) { }

  ngOnInit(): void {
    this.addToProceed.canMove = false;

    this.allAddresses = new Array<Address>();

    this.allIncidents = new Array<Incident>();
    this.allIncidents.push(new Incident("INC1", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "pvr", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "", "", "", ""));
    this.allIncidents.push(new Incident("INC2", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "pvr", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "", "", "", ""));
    this.allIncidents.push(new Incident("INC3", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "pvr", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "", "", "", ""));

    this.allTeams = new Array<Team>();
    this.allTeams.push(new Team("T1","name",new Array<User>()));
    this.allTeams.push(new Team("T2","name",new Array<User>()));
    this.allTeams.push(new Team("T3","name",new Array<User>()));

    this.workPlanForm = this.fb.group({
      type: ['', [
        Validators.required
      ]],
      incident: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
      team: ['', [
        Validators.required
      ]],
      purpose: ['', [
        Validators.required
      ]],
      notes: ['', [
      ]],
      company: ['', [
        Validators.required
      ]],
      phoneNomber: ['', [
        Validators.required
      ]]
    });
    console.log(this.currentDate);
  }

  submitWorkPlan(){
    this.addToProceed.canMove = true;
    this.addToProceed.canReturn = false;
  }

  get type(){
    return this.workPlanForm.get('type');
  }

  get incident(){
    return this.workPlanForm.get('incident');
  }

  get address(){
    return this.workPlanForm.get('address');
  }

  get startDate(){
    return this.workPlanForm.get('startDate');
  }

  get endDate(){
    return this.workPlanForm.get('endDate');
  }

  get team(){
    return this.workPlanForm.get('team');
  }

  get purpose(){
    return this.workPlanForm.get('purpose');
  }

  get notes(){
    return this.workPlanForm.get('pnotes');
  }

  get company(){
    return this.workPlanForm.get('company');
  }

  get phoneNomber(){
    return this.workPlanForm.get('phoneNomber');
  }

  get creationDate(){
    return this.workPlanForm.get('creationDate');
  }
}
