import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginData } from 'src/app/model/login-data';
import { Address } from '../../model/address';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:61791";
  private _logedInUser = new Subject<User>();

  logedInUser$ = this._logedInUser.asObservable();

  constructor(private http: HttpClient) { }

  setUser(user: User){
    this._logedInUser.next(user);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url + "/api/User");
  }

  getUser(id: string): Observable<User>{
    return this.http.get<User>(this.url + "/api/User/" + id);
  }

  getUsersEmailConfirme(): Observable<User[]>{
    return this.http.get<User[]>(this.url + "/api/User/GetUsersEmailConfirm");
  }

  getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url + "/api/Address");
  }

  postLogin(ld:LoginData)
  {
    const formData = new FormData();
    formData.append('username', ld.username);
    formData.append('password', ld.password);
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/User/Login", formData, httpOptions);
    //return this.http.post(this.url + "/api/User", username, password);
  }

  postUser(user: User){
    const formData = new FormData();
    formData.append('username',user.userName);
    formData.append('firstName', user.firstName);
    formData.append('lastname', user.lastName);
    formData.append('password', user.password);
    formData.append('birthDate', user.birthDate.toString());
    formData.append('addressId', user.addressID.toString());
    formData.append('email', user.email);
    formData.append('selecetdFile', user.selecetdFile!, user.selecetdFile!.name);
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.post(this.url + "/api/User", formData, httpOptions);
  }

  putUser(user: User){
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('username',user.userName);
    formData.append('firstName', user.firstName);
    formData.append('lastname', user.lastName);
    formData.append('password', user.password);
    formData.append('birthDate', user.birthDate.toString());
    formData.append('addressId', user.addressID.toString());
    formData.append('email', user.email);
    if(user.selecetdFile !== null){
      formData.append('selecetdFile', user.selecetdFile!, user.selecetdFile!.name);
    }
    const httpOptions = { headers: new HttpHeaders({  observe: 'response'})};
    return this.http.put(this.url + "/api/User", formData, httpOptions);
  }

  deleteUser(id: number){
    return this.http.delete(this.url + "/api/User/" + id);
  }

  getAddress(id: number): Observable<Address>{
    return this.http.get<Address>(this.url + "/api/Address/" + id);
  }

  updateStatus(user: User) {
    return this.http.put(this.url + "/api/User/UpdateStatus", user);
  }

  socialLogin(formData:any) {
    return this.http.post(this.url + "/api/User/SocialLogin", formData);
  }

}
