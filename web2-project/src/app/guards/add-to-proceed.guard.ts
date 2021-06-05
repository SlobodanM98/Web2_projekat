import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddToProceedService } from '../services/add-to-proceed.service';

@Injectable({
  providedIn: 'root'
})
export class AddToProceedGuard implements CanActivate { 
  constructor(private service: AddToProceedService){ }

  canActivate(){
    if(!this.service.CanMove){
      alert("You need to add a work plan first!");
    }

    return this.service.CanMove;
  }
  
}
