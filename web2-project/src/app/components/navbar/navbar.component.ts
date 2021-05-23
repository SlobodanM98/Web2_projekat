import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pageDescription : string = '';

  constructor(public router : Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        let route = ev.url.split("/");
        this.pageDescription = route[route.length - 1];
        if(this.pageDescription == "Navbar"){
          this.pageDescription = "Dashboard";
        }
      }
    });
   }

  ngOnInit(): void {
  }

}
