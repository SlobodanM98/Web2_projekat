import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafetyDocument, TipDokumenta} from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  allDocuments:Array<SafetyDocument>;
  filteredDocuments:Array<SafetyDocument> = new Array<SafetyDocument>();
  authorFilter:string;
  token:any;
  filterForm:FormGroup;


  addDocumentForm: FormGroup;
  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private documentService:DocumentService) { }

  ngOnInit(): void {

    this.documentService.getDocuments().subscribe(data => {

      this.allDocuments = new Array<SafetyDocument>();
      this.allDocuments = data;
      this.filteredDocuments = this.allDocuments;
      console.log('SVI DOKUMENTI');
      console.log(this.filteredDocuments);
      //console.log(this.filteredDocuments);
    });

    this.filterForm = this.formBuilder.group({
      DocumentAuthorFilter:['', []]
    });


    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(this.token);
    console.log(DecodedToken);
    this.authorFilter = DecodedToken.username;



    

    
    
   
    
  }
  submitDocument()
  {
    /*
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
    var doc = new SafetyDocument(docType,this.addDocumentForm.controls['PlanRada'].value,this.addDocumentForm.controls['Author'].value,this.addDocumentForm.controls['Details'].value,this.addDocumentForm.controls['Notes'].value,this.addDocumentForm.controls['PhoneNum'].value, this.addDocumentForm);
    this.allDocuments.push(doc);
    console.log(doc);*/

  }
  filterDocuments()
  {
   // this.filteredDocuments = this.allDocuments;
   if (this.filterForm.controls["DocumentAuthorFilter"].value == "showMine"){
     this.filteredDocuments = this.filteredDocuments.filter(x => x.author == this.authorFilter);
   }
   else {
    this.filteredDocuments = this.allDocuments;
   }
    
  }
  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }
  resetFilter()
  {
    this.filteredDocuments = this.allDocuments;
  }
  /*
  openAddDocumentModal(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

*/
}
