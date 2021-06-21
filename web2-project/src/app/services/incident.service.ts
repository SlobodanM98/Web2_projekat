import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Incident} from "src/app/model/incident";
import { Device } from '../model/device';
import { Team } from '../model/team/team.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private url: string = "http://localhost:61791"

  constructor(private http: HttpClient) { }


  getIncidents():Observable<Incident[]>
  {
    return this.http.get<Incident[]>(this.url + '/api/Incident');
  }

  postIncident(incident:Incident)
  {
    const formData = new FormData();
    formData.append("Tip",incident.tip.toString());
    //formData.append("Prioritet", incident.Prioritet.toString());
    //formData.append("Potvrdjen", incident.Potvrdjen.valueOf.toString());
    formData.append("Status", incident.status);
    formData.append("ETA", incident.eta.toString());
    formData.append("ATA", incident.ata.toString());
    formData.append("ETR", incident.etr.toString());
    formData.append("PVR", incident.pvr.toString());
    formData.append("VremeIncidenta",incident.vremeIncidenta.toString());
    formData.append("NivoNapona",incident.nivoNapona.toString());
    formData.append("UserID", incident.userID);
    formData.append("Uzrok", "/");
    formData.append("Poduzrok", "/");
    formData.append("Konstrukcija", "/");
    formData.append("Materijal", "/");
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/Incident", formData, httpOptions);
    
  }

  postIncidentDevice(incidentID:number, deviceID:number)
  {
    const formData = new FormData();
    formData.append('IncidentID', incidentID.toString());
    formData.append("DeviceID", deviceID.toString());
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/IncidentDevice", formData, httpOptions);

  }

  getIncidentDevices(id:number):Observable<Device[]>
  {
    return this.http.get<Device[]>(this.url + '/api/Device/IncidentDevice/'+id); 
  }

  getDevices():Observable<Device[]>
  {
    return this.http.get<Device[]>(this.url + '/api/Device')
  }

  putIncident(incident:Incident)
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Incident", incident, httpOptions);
  }
  getTeams():Observable<Team[]>
  {
    return this.http.get<Team[]>(this.url + '/api/Team');
  }
  postIncidentImage(image: File, incidentID: number){
    const formData = new FormData();
    formData.append('ID', incidentID.toString());
    formData.append('image',image, image.name);
    return this.http.post(this.url + "/api/Incident/Image", formData);
  }

  getIncidentImage(incidentID: number): Observable<string[]>{
    return this.http.get<string[]>(this.url + "/api/Incident/Image/" + incidentID);
  }
  deleteIncident(id: number){
    return this.http.delete(this.url + "/api/Incident/" + id);
  }


}
