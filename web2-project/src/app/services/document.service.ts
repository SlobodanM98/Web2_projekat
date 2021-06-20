import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafetyDocument } from '../model/safety-document';
import { Observable } from 'rxjs';
import { Team } from '../model/team/team.model';
import { WorkPlan } from '../model/work-plan';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url: string = "http://localhost:61791"
  constructor(private http: HttpClient) { }

  postDocument(document:SafetyDocument)
  {
    const formData = new FormData();
    formData.append("TipDokumenta",document.Tip.toString());
    formData.append("PlanRada", document.PlanRada.toString());
    formData.append("Author", document.Author);
    formData.append("Team", document.Team.toString());
   // formData.append("Status", document.Status);
    formData.append("Details", document.Details);
    formData.append("Notes", document.Notes);
    formData.append("PhoneNum", document.PhoneNum);
    formData.append("DateOfCreation", document.dateOfCreation.toString());
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/SafetyDocument", formData, httpOptions);

    
  }

  postDocument2(document:SafetyDocument)
  {
    return this.http.post(this.url + "/api/SafetyDocument", document);
  }
  getTeams():Observable<Team[]>
  {
    return this.http.get<Team[]>(this.url + '/api/Team');
  }
  getDocuments():Observable<SafetyDocument[]>
  {
    return this.http.get<SafetyDocument[]>(this.url + '/api/SafetyDocument');
  }


}
