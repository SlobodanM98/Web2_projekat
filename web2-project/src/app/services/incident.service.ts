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
    formData.append("ETA", incident.eta);
    formData.append("ATA", incident.ata);
    formData.append("ETR", incident.etr);
    formData.append("PVR", incident.pvr);
    formData.append("VremeIncidenta",incident.vremeIncidenta);
    formData.append("NivoNapona",incident.nivoNapona.toString());
    formData.append("Uzrok", "/");
    formData.append("Poduzrok", "/");
    formData.append("Konstrukcija", "/");
    formData.append("Materijal", "/");
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/Incident", formData, httpOptions);

    
  }

}
