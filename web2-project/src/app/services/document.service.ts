import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafetyDocument } from '../model/safety-document';
import { Observable } from 'rxjs';
import { Team } from '../model/team/team.model';
import { WorkPlan } from '../model/work-plan';
import { Device } from '../model/device';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url: string = "http://localhost:61791"
  constructor(private http: HttpClient) { }

  postDocument(document:SafetyDocument)
  {
    const formData = new FormData();
    formData.append("TipDokumenta",document.tipDokumenta.toString());
    formData.append("PlanRada", document.planRada.toString());
    formData.append("Author", document.author);
    formData.append("Team", document.team.toString());
    formData.append("Status", document.status);
    formData.append("Details", document.details);
    formData.append("Notes", document.notes);
    formData.append("PhoneNum", document.phoneNum);
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
  putDocument(document:SafetyDocument)
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/SafetyDocument", document, httpOptions);
  }

  getDevices():Observable<Device[]>
  {
    return this.http.get<Device[]>(this.url + '/api/Device')
  }

  getDocumentDevices(id:number):Observable<Device[]>
  {
    return this.http.get<Device[]>(this.url + '/api/Device/DocumentDevice/'+id); 
  }

  
  postDocumentDevice(documentID:number, deviceID:number)
  {
    const formData = new FormData();
    formData.append('DocumentID', documentID.toString());
    formData.append("DeviceID", deviceID.toString());
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/DocumentDevice", formData, httpOptions);

  }

  postDocumentImage(image: File, documentID: number){
    const formData = new FormData();
    formData.append('ID', documentID.toString());
    formData.append('image',image, image.name);
    return this.http.post(this.url + "/api/SafetyDocument/Image", formData);
  }

  getDocumentImage(documentID: number): Observable<string[]>{
    return this.http.get<string[]>(this.url + "/api/SafetyDocument/Image/" + documentID);
  }

  deleteDevice(id: number){
    return this.http.delete(this.url + "/api/SafetyDocument/" + id);
  }
  
  

}
