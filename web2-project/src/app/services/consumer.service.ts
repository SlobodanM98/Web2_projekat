import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Consumer } from '../model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getConsumers(): Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.url + "/api/Consumer");
  }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  postConsumer(consumer: Consumer){
    return this.http.post(this.url + "/api/Consumer", consumer);
  }

  putConsumer(consumer: Consumer){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Consumer", consumer, httpOptions);
  }

  deleteConsumer(id: number){
    return this.http.delete(this.url + "/api/Consumer/" + id);
  }
}
