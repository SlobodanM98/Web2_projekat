import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incidents-resolution',
  templateUrl: './incidents-resolution.component.html',
  styleUrls: ['./incidents-resolution.component.css']
})
export class IncidentsResolutionComponent implements OnInit {


  public resolutionForm:FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.resolutionForm = this.fb.group(
      {
        cause: ['', [Validators.required]],
        subcause : ['',[Validators.required]],
        construction: ['',[Validators.required]],
        material: ['',[Validators.required]]
      })

  }
  public submitResolution()
  {

  }
}
