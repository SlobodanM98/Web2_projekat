import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafetyDocument } from '../model/safety-document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url: string = "http://localhost:61791"
  constructor(private http: HttpClient) { }

  postIncident(document:SafetyDocument)
  {
    const formData = new FormData();
    formData.append("TipDokumenta",document.TipDokumenta.toString());
    formData.append("PlanRada", document.PlanRada);
    formData.append("Author", document.Author);
    formData.append("Team", document.Team);
    formData.append("Details", document.Details);
    formData.append("Notes", document.Notes);
    formData.append("PhoneNum", document.PhoneNum);
    formData.append("DateOfCreation", document.dateOfCreation.toString());
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/SafetyDocument", formData, httpOptions);

    
  }
}
