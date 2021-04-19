import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageDescription : string = '';

  constructor(private commonService : CommonService, public router : Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        let route = ev.url.split("/");
        this.pageDescription = '';
        for(let part of route) {
          this.pageDescription += part + '/';
        }
      }
    });
   }

  ngOnInit(): void {
  }

}
