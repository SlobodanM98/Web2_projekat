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
    //var header = new HttpHeaders({ 'content-type': 'application/json' });
    console.log(team);
    return this.http.post(this.url + "/api/Team", team)// { headers: header });
  }

  putTeam(team: Team){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.url + "/api/Team", team, httpOptions);
  }

  deleteTeam(id: number){
    return this.http.delete(this.url + "/api/Team/" + id);
  }
  
}
