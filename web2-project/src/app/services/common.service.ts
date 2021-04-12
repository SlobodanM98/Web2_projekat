import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private data = new Subject<string>();
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data)
  }
}
