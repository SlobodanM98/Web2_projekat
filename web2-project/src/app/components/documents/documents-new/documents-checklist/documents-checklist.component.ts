import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-documents-checklist',
  templateUrl: './documents-checklist.component.html',
  styleUrls: ['./documents-checklist.component.css']
})
export class DocumentsChecklistComponent implements OnInit {
  DocumentsChecklist:FormGroup;


  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
  }

}
