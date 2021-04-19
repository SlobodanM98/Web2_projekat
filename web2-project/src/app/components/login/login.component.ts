import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  poruka : string;

  constructor(private commonService : CommonService, public router : Router) { }

  ngOnInit(): void {
    this.commonService.data$.subscribe(message => this.poruka = message);
  }

  logIn(){
    this.commonService.changeData("true");
    this.router.navigate(["/Navbar"]);
  }

}
