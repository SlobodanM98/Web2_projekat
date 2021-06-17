import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Device } from '../model/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(this.url + "/api/Device");
  }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  postDevice(device:Device){
    return this.http.post(this.url + "/api/Device", device);
  }

  putDevice(device:Device){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Device", device, httpOptions);
  }

  deleteDevice(id: number){
    return this.http.delete(this.url + "/api/Device/" + id);
  }
}
