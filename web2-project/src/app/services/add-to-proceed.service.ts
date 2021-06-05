import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToProceedService {

  public canMove: boolean;
  public canReturn: boolean;

  constructor() {
    this.canMove = true;
    this.canReturn = true;
   }

   get CanMove() : boolean{
    return this.canMove;
   }

   get CanReturn() : boolean{
     return this.canReturn;
   }
}
