import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Call } from '../model/call';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getCalls(): Observable<Call[]>{
    return this.http.get<Call[]>(this.url + "/api/Call");
  }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  postCall(call: Call){
    return this.http.post(this.url + "/api/Call", call);
  }

  putCall(call: Call){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Call", call, httpOptions);
  }

  deleteCall(id: number){
    return this.http.delete(this.url + "/api/Call/" + id);
  }
}
