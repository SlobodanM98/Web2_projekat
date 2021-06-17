import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Incident, IncidentType } from 'src/app/model/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incidents-basic-info',
  templateUrl: './incidents-basic-info.component.html',
  styleUrls: ['./incidents-basic-info.component.css']
})
export class IncidentsBasicInfoComponent implements OnInit {

  incidentBasicForm:FormGroup;
  incidentObj:Incident;
  tip:IncidentType;

  


  constructor(private fb: FormBuilder, private incidentService:IncidentService) { }

  ngOnInit(): void {
    
    this.incidentBasicForm = new FormGroup({
      incidentID : new FormControl('', []),
      affectedCustomers:new FormControl('', [Validators.required]),
      type: new FormControl('',[Validators.required]),
      outagetime: new FormControl('',[Validators.required]),
      priority: new FormControl('',[Validators.required]),
      etr:new FormControl('', [Validators.required]),
      confirmed: new FormControl('', [Validators.required]),
      calls:new FormControl('', Validators.required),
      status:new FormControl('', Validators.required),
      voltage:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      scheduled:new FormControl('',Validators.required),
      eta:new FormControl('',Validators.required),
      ata:new FormControl('',Validators.required),
      pvr:new FormControl('',Validators.required)  

    });
 
  }
  saveIncident()
  {
   
    if (this.incidentBasicForm.controls["type"].value == "Planiran")
    {
      this.tip = IncidentType.Planiran;
    }
    else{
      this.tip = IncidentType.Neplaniran;
    }
    //var id = this.incidentBasicForm.controls["incidentID"].value;
    //var pri = this.incidentBasicForm.controls["priority"].value;
    var stat = this.incidentBasicForm.controls["status"].value;
    var eta = this.incidentBasicForm.controls["eta"].value;
    var ata = this.incidentBasicForm.controls["ata"].value;
    var sch = this.incidentBasicForm.controls["scheduled"].value;
    var etr = this.incidentBasicForm.controls["etr"].value;
    var vol = this.incidentBasicForm.controls["voltage"].value;
    var pvr = this.incidentBasicForm.controls["pvr"].value;

    this.incidentObj = new Incident(this.tip,stat,eta, ata,sch,etr,vol,pvr);
    console.log(this.incidentObj);
    this.incidentService.postIncident(this.incidentObj).subscribe(data => {
        console.log(data);


    });

  }

}
