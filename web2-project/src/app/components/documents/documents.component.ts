
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafetyDocument, TipDokumenta} from 'src/app/model/safety-document';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  allDocuments:Array<SafetyDocument>;
  filteredDocuments:Array<SafetyDocument> = new Array<SafetyDocument>();
  authorFilter:string;


  addDocumentForm: FormGroup;
  constructor(private formBuilder : FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.addDocumentForm = this.formBuilder.group({
      TipDokumenta: ['', [Validators.required]],
      PlanRada: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Details:['', [Validators.required]],
      Notes:['', [Validators.required]],
      PhoneNum:['', [Validators.required]]
    });
    
    this.allDocuments = new Array<SafetyDocument>();
    this.allDocuments.push(new SafetyDocument(TipDokumenta.NeplaniraniRad, "123", "Pera", "Detalj 1", "Notes1", "381655406188"));
    this.allDocuments.push(new SafetyDocument(TipDokumenta.PlaniraniRad,"91","Zika", "Details 2", "Notes 2", "3815528288"));
    this.allDocuments.push(new SafetyDocument(TipDokumenta.NeplaniraniRad,"1201","Mika", "Details 3", "Notes 3", "3814161997"));
    
    this.allDocuments.forEach(element => {
      this.filteredDocuments.push(element);
    });
    
  }
  submitDocument()
  {
    console.log('saving document');
    var docType:TipDokumenta;
    if (this.addDocumentForm.controls['TipDokumenta'].value == "Planiran")
    {
      docType = TipDokumenta.PlaniraniRad;
    }
    else 
    {
      docType = TipDokumenta.NeplaniraniRad;
    }
    var doc = new SafetyDocument(docType,this.addDocumentForm.controls['PlanRada'].value,this.addDocumentForm.controls['Author'].value,this.addDocumentForm.controls['Details'].value,this.addDocumentForm.controls['Notes'].value,this.addDocumentForm.controls['PhoneNum'].value);
    this.allDocuments.push(doc);
    console.log(doc);

  }
  filterDocuments()
  {
   // this.filteredDocuments = this.allDocuments;
   console.log('filtering...');
    
  }
  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }
  resetFilter()
  {
    console.log('reseting');
  }
  openAddDocumentModal(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


}
