import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from 'src/app/model/team/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url: string = "http://localhost:61791";

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.url + "/api/Team");
  }

  postTeam(team: Team){
    return this.http.post(this.url + "/api/Team", team);
  }
  
}
