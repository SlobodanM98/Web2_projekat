import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
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

  constructor(private commonService : CommonService, public router : Router){
    this.isLoggedIn = false;
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.pageDescription = ev.url.split("/")[1];
      }
    });
  }

  ngOnInit(){
    this.commonService.data$.subscribe(
      message => 
      {
        if(message == "true"){
          this.isLoggedIn = true;
        }else if(message == "false"){
          this.isLoggedIn = false;
        }
      }
    );
  }
}
