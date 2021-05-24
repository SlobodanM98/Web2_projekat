import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkAccount, Type } from '../../model/work-account'
import { Subject } from 'rxjs';
import { Status } from '../../model/work-account'
import { WorkAccountMultimediaComponent } from 'src/app/components/work-account/work-account-new/work-account-multimedia/work-account-multimedia.component';

@Injectable({
  providedIn: 'root'
})
export class WorkAccountService {

  public workAccount: WorkAccount;
  public currentType = "";
  public currentState2 = "";
  public currentEmergencyWork = false;
  public currentAddress = "";
  public currentAddressNumber = "";
  public currentStartDate = "";
  public currentEndDate = "";
  public currentPurpose = "";
  public currentNotes = "";
  public currentCompany = "";
  public currentPhoneNomber = "";

  public currentState = "";

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  
}
