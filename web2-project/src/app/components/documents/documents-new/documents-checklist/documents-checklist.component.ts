import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafetyDocument } from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-documents-checklist',
  templateUrl: './documents-checklist.component.html',
  styleUrls: ['./documents-checklist.component.css']
})
export class DocumentsChecklistComponent implements OnInit {
  DocumentsChecklist:FormGroup;
  workingDocument:any;
  allDocs:Array<SafetyDocument>;

  constructor(private fb: FormBuilder, private documentService:DocumentService) { }
  ngOnInit(): void {

    this.DocumentsChecklist = this.fb.group({
      operationComplete:['',[Validators.required]],
      tagsRemoved:['',[Validators.required]],
      groundingRemoved:['',[Validators.required]],
      serviceReady:['',[Validators.required]]

    });

    this.allDocs = new Array<SafetyDocument>();
    this.documentService.getDocuments().subscribe(data => {
      this.allDocs = data;
      this.workingDocument = this.allDocs.pop();
      console.log(this.workingDocument);

    });
  }

  updateDocument(){
   
    this.workingDocument.SafetyOp= this.DocumentsChecklist.controls["operationComplete"].value;
    this.workingDocument.tagsRemoved = this.DocumentsChecklist.controls["tagsRemoved"].value;
    this.workingDocument.groundingRemoved = this.DocumentsChecklist.controls["groundingRemoved"].value;
    this.workingDocument.readyForService = this.DocumentsChecklist.controls["serviceReady"].value;
    console.log(this.workingDocument);
    this.documentService.putDocument(this.workingDocument).subscribe();
      

  }

}
