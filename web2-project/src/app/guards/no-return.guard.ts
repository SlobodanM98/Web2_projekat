import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddToProceedService } from '../services/add-to-proceed.service';

@Injectable({
  providedIn: 'root'
})
export class NoReturnGuard implements CanActivate {
  constructor(private service: AddToProceedService){ }

  canActivate(){
    if(!this.service.CanReturn){
      alert("You have already added a work plan!");
    }

    return this.service.CanReturn;
  }
  
}
