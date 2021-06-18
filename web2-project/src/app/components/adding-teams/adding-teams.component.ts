import { Component, OnInit, Input, ViewChild, AfterViewInit, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../model/team/team.model'
import { User } from '../../model/user'
import { TeamService } from 'src/app/services/team/team.service';

export interface TableElement
{
  id:number;
  name:string;
  //status:string;
}

@Component({
  selector: 'app-adding-teams',
  templateUrl: './adding-teams.component.html',
  styleUrls: ['./adding-teams.component.css']
})
export class AddingTeamsComponent implements OnInit, AfterViewInit {

  teams: Array<TableElement>;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: any;
  deleteTeam:Team;

  closeResult = '';
  id: number;
  name: string;
  view = 'View';

  constructor(private modalService: NgbModal, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams = new Array<TableElement>();
    this.teamService.getTeams().subscribe(data => {
      var copy = data;
      copy.forEach(element => {
        console.log(element);
        var data2: TableElement = {id: element.teamID, name: element.name}
        console.log(data2);
        this.teams.push(data2);
      })
      console.log(this.teams);
    })
    /*this.teams.push(team);
    this.teams.push(new Team("T2", "Konsultacije"));
    this.teams.push(new Team("T3", "Web2", new Array<User>()));
    this.teams.push(new Team("T4", "SBES", new Array<User>()));*/
    
    this.dataSource = new MatTableDataSource(this.teams);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewEditTeam(content:any, t: Team, view: string) {
    this.view = view;
    this.id = t.teamID;
    this.name = t.name;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result : any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason : any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(element: Team, contentDelete: any){
    this.deleteTeam = element;
    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-delete'});
  }

  deleteTeamConfirm() {
    this.modalService.dismissAll();
    var newList = new Array<TableElement>();
    this.teams.forEach(element => {
      if(element.id != this.deleteTeam.teamID) {
        newList.push(element);
      }
    });
    this.teams = newList;
    this.dataSource = new MatTableDataSource(newList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
