import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Incident } from 'src/app/model/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incidents-resolution',
  templateUrl: './incidents-resolution.component.html',
  styleUrls: ['./incidents-resolution.component.css']
})
export class IncidentsResolutionComponent implements OnInit {


  resolutionForm:FormGroup;
  workingIncident:any;
  listIncident:Array<Incident>;

  poduzrokOtkaz:string[] = ["KratakSpoj", "Istrosenost", "MehanickiOtkaz"];
  poduzrokVreme:string[] = ["Kisa", "Grad", "Vetar", "Uragan"];
  poduzrokHumanError:string[] = ["PogresnaOprema", "LosNapon", "LosaInstalacija"];
  poduzrok:string[];

  constructor(private fb: FormBuilder, private incService:IncidentService) { }

  ngOnInit(): void {

    this.listIncident = new Array<Incident>();
    this.incService.getIncidents().subscribe(data =>{
        //console.log(data);
        this.listIncident = new Array<Incident>();
        this.listIncident = data; 
        this.workingIncident = this.listIncident.pop();
        console.log(this.workingIncident);
        
      }

    );
    //console.log(this.listIncident);
    this.resolutionForm = this.fb.group(
      {
        cause: ['', [Validators.required]],
        subcause : ['',[Validators.required]],
        construction: ['',[Validators.required]],
        material: ['',[Validators.required]]
      })
      
      

  }
  submitResolution()
  {
    console.log('working incident:'+this.workingIncident);
    this.workingIncident.uzrok = this.resolutionForm.controls["cause"].value;
    this.workingIncident.poduzrok = this.resolutionForm.controls["subcause"].value;
    this.workingIncident.konstrukcija = this.resolutionForm.controls["construction"].value;
    this.workingIncident.materijal = this.resolutionForm.controls["material"].value;
    this.incService.putIncident(this.workingIncident).subscribe();
    console.log(this.workingIncident);

  }

  uzrokPromena(event:any)
  {
    if (event.value === "Vreme")
    {
      this.poduzrok = this.poduzrokVreme;
    }
    else if (event.value === "Otkaz")
    {
      this.poduzrok = this.poduzrokOtkaz;
    }
    else if (event.value === "LjudskiFaktor")
    {
      this.poduzrok = this.poduzrokHumanError;
    }
  }
}
