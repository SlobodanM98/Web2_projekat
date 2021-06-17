import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafetyDocument, TipDokumenta } from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-documents-basic-info',
  templateUrl: './documents-basic-info.component.html',
  styleUrls: ['./documents-basic-info.component.css']
})
export class DocumentsBasicInfoComponent implements OnInit {

 
  DocumentBasicInfo:FormGroup;
  doc:SafetyDocument;
  td:TipDokumenta;



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
  }

  saveDocBasicInfo(){
    
    if (this.DocumentBasicInfo.controls["documentType"].value == "Planned")
    {
      this.td = TipDokumenta.PlaniraniRad
    }
    else{
      this.td = TipDokumenta.NeplaniraniRad;
    }

    this.doc = new SafetyDocument(this.td,"/",this.DocumentBasicInfo.controls["author"].value,this.DocumentBasicInfo.controls["details"].value,this.DocumentBasicInfo.controls["notes"].value,this.DocumentBasicInfo.controls["phoneNum"].value, this.DocumentBasicInfo.controls["dateCreated"].value);
    console.log(this.doc);
    this.docService.postIncident(this.doc).subscribe();


  }

}
