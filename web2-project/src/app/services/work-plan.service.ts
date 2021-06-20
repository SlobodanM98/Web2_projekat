import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../model/address';
import { Device } from '../model/device';
import { InstructionStatus, WorkInstruction } from '../model/work-instruction';
import { WorkPlan, WorkPlanStatusHistory } from '../model/work-plan';

@Injectable({
  providedIn: 'root'
})
export class WorkPlanService {
  private url: string = "http://localhost:61791";
  
  constructor(private http: HttpClient) { }

  getWorkPlan(): Observable<WorkPlan[]>{
    return this.http.get<WorkPlan[]>(this.url + "/api/WorkPlan");
  }

  getWorkPlanID(id: number): Observable<WorkPlan>{
    return this.http.get<WorkPlan>(this.url + "/api/WorkPlan/" + id);
  }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  postWorkPlan(workPlan: WorkPlan){
    return this.http.post(this.url + "/api/WorkPlan", workPlan);
  }

  postWorkPlanHistory(workPlanHistory: WorkPlanStatusHistory){
    return this.http.post(this.url + "/api/WorkPlan/History", workPlanHistory);
  }

  putWorkPlan(workPlan: WorkPlan){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/WorkPlan", workPlan, httpOptions);
  }

  postWorkPlanImage(image: File, workPlanID: number){
    const formData = new FormData();
    formData.append('ID', workPlanID.toString());
    formData.append('image',image, image.name);
    return this.http.post(this.url + "/api/WorkPlan/Image", formData);
  }

  postWorkPlanInstruction(instruction: WorkInstruction, workPlanID: number){
    const formData = new FormData();
    formData.append('ID', workPlanID.toString());
    formData.append('deviceID', instruction.device.id.toString());
    formData.append('description', instruction.description);

    return this.http.post(this.url + "/api/WorkPlan/Instruction", formData);
  }

  postWorkPlanDevice(device: Device, workPlanID: number){
    const formData = new FormData();
    formData.append('ID', workPlanID.toString());
    formData.append('deviceID', device.id.toString());

    return this.http.post(this.url + "/api/WorkPlan/Device", formData);
  }

  getWorkPlanDevice(workPlanID: number): Observable<number[]>{
    return this.http.get<number[]>(this.url + "/api/WorkPlan/Device/" + workPlanID);
  }

  getWorkPlanInstruction(): Observable<WorkInstruction[]>{
    return this.http.get<WorkInstruction[]>(this.url + "/api/WorkPlan/Instruction");
  }

  getWorkPlanInstructionID(workPlanID: number): Observable<number[]>{
    return this.http.get<number[]>(this.url + "/api/WorkPlan/Instruction/" + workPlanID);
  }

  getWorkPlanImage(workPlanID: number): Observable<string[]>{
    return this.http.get<string[]>(this.url + "/api/WorkPlan/Image/" + workPlanID);
  }

  getWorkPlanHistoryID(workPlanID: number): Observable<number[]>{
    return this.http.get<number[]>(this.url + "/api/WorkPlan/History/" + workPlanID);
  }

  getWorkPlanHistory(): Observable<WorkPlanStatusHistory[]>{
    return this.http.get<WorkPlanStatusHistory[]>(this.url + "/api/WorkPlan/History");
  }

  deleteWorkPlan(id: number){
    return this.http.delete(this.url + "/api/WorkPlan/" + id);
  }
}
