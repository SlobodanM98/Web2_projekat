import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-documents-basic-info',
  templateUrl: './documents-basic-info.component.html',
  styleUrls: ['./documents-basic-info.component.css']
})
export class DocumentsBasicInfoComponent implements OnInit {

 
  DocumentBasicInfo:FormGroup;


  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
  }

}
