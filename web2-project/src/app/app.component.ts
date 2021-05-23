import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web2-project';

  isLoggedIn : boolean;
  pageDescription : string;

  constructor(public router : Router){
    this.isLoggedIn = false;
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.pageDescription = ev.url.split("/")[1];
      }
    });
  }

  ngOnInit(){
  }
}
