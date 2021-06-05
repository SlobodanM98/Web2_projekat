import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings>{
    return this.http.get<Settings>(this.url + "/api/Settings/1");
  }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  putAddress(address: Address){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Address", address, httpOptions);
  }
  
  putSettings(settings: Settings){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Settings", settings, httpOptions);
  }
}
