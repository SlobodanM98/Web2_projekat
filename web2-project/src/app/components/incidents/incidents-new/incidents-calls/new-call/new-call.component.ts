import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Call} from 'src/app/model/call';
import { Consumer } from 'src/app/model/consumer';


@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnInit {
  @Input() reasons:string[];

  newCallForm:FormGroup;
  consumer:Consumer;
  
  constructor() { }

  ngOnInit(): void {




    this.newCallForm = new FormGroup({
      callReason : new FormControl('', Validators.required),
      hazard : new FormControl('', [Validators.required]),
      comment : new FormControl('', [Validators.maxLength(100)]),
      callLocationControl : new FormControl('', Validators.required)

    });

  }

  SubmitCall(){

  }

}
