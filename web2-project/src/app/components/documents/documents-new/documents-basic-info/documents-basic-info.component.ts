import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafetyDocument, TipDokumenta } from 'src/app/model/safety-document';
import { Team } from 'src/app/model/team/team.model';
import { DocumentService } from 'src/app/services/document.service';

import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-documents-basic-info',
  templateUrl: './documents-basic-info.component.html',
  styleUrls: ['./documents-basic-info.component.css']
})
export class DocumentsBasicInfoComponent implements OnInit {

 
  DocumentBasicInfo:FormGroup;
  doc:SafetyDocument;
  td:TipDokumenta;
  t:Team;
  isNew:boolean;
  username:string;
  token:any;
  allTeams:Array<Team>;


  constructor(private fb: FormBuilder, private docService:DocumentService) { }


  ngOnInit(): void {

    this.DocumentBasicInfo = this.fb.group({
      documentType: ['',Validators.required],
      phoneNum: ['',Validators.required],
      status:['',Validators.required],
      crew:['',Validators.required],
      switchPlan:['',Validators.required],
      dateCreated:['',Validators.required],
      author:['',Validators.required],
      details:['',Validators.required],
      notes:['',Validators.required],
     

    });

    this.allTeams = new Array<Team>();
    this.docService.getTeams().subscribe(data => {
      this.allTeams = new Array<Team>();
      this.allTeams = data;
    })
    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    //console.log(DecodedToken);
    this.username = DecodedToken.username;
  }

  saveDocBasicInfo(){
    
    if (this.DocumentBasicInfo.controls["documentType"].value === "Planned")
    {
      this.td = TipDokumenta.PlaniraniRad
    }
    else{
      this.td = TipDokumenta.NeplaniraniRad;
    }

    console.log(this.td.toString());
    this.doc = new SafetyDocument();
    this.doc.tipDokumenta = this.td;
    this.doc.phoneNum = this.DocumentBasicInfo.controls["phoneNum"].value;
    this.doc.status = this.DocumentBasicInfo.controls["status"].value;
    this.doc.author = this.username;
    this.doc.planRada = this.DocumentBasicInfo.controls["switchPlan"].value;
    this.doc.details = this.DocumentBasicInfo.controls["details"].value;
    this.doc.notes = this.DocumentBasicInfo.controls["notes"].value;
    this.doc.team = this.DocumentBasicInfo.controls["crew"].value;
    this.doc.dateOfCreation = this.DocumentBasicInfo.controls["dateCreated"].value;
    


    //this.doc = new SafetyDocument(this.td,"/",this.DocumentBasicInfo.controls["author"].value,this.t,this.DocumentBasicInfo.controls["details"].value,this.DocumentBasicInfo.controls["notes"].value,this.DocumentBasicInfo.controls["phoneNum"].value, this.DocumentBasicInfo.controls["dateCreated"].value);
    console.log(this.doc);
    this.docService.postDocument2(this.doc).subscribe();


  }

}
