import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incidents-basic-info',
  templateUrl: './incidents-basic-info.component.html',
  styleUrls: ['./incidents-basic-info.component.css']
})
export class IncidentsBasicInfoComponent implements OnInit {

  incidentBasicForm:FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
