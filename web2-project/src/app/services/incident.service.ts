import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Incident} from "src/app/model/incident";

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private url: string = "http://localhost:61791"

  constructor(private http: HttpClient) { }


  getIncidents():Observable<Incident>
  {
    return this.http.get<Incident>(this.url + '/api/Incident');
  }

  postIncident(incident:Incident)
  {
    const formData = new FormData();
    formData.append("Tip",incident.Tip.toString());
    //formData.append("Prioritet", incident.Prioritet.toString());
    //formData.append("Potvrdjen", incident.Potvrdjen.valueOf.toString());
    formData.append("Status", incident.Status);
    formData.append("ETA", incident.ETA);
    formData.append("ATA", incident.ATA);
    formData.append("ETR", incident.ETR);
    formData.append("PVR", incident.PVR);
    formData.append("VremeIncidenta",incident.VremeIncidenta);
    formData.append("NivoNapona",incident.NivoNapona.toString());
    formData.append("Uzrok", "/");
    formData.append("Poduzrok", "/");
    formData.append("Konstrukcija", "/");
    formData.append("Materijal", "/");
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/Incident", formData, httpOptions);

    
  }

}
