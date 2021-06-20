import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WorkAccount, Status } from '../../model/work-account/work-account.model'

@Component({
  selector: 'app-work-account',
  templateUrl: './work-account.component.html',
  styleUrls: ['./work-account.component.css']
})
export class WorkAccountComponent implements OnInit {

  allWorkAccounts: Array<WorkAccount>;
  filteredWorkAccounts: Array<WorkAccount>;

  statusFilter: boolean;
  beforeDateFilter: boolean;
  afterDateFilter: boolean;
  viewAllFilter: boolean; //true -> All, false -> Mine

  status: Status;
  beforeDate: Date;
  afterDate: Date;

  role: string;

  constructor() { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.role = DecodedToken.role;

    this.allWorkAccounts = new Array<WorkAccount>();
    this.allWorkAccounts.push(new WorkAccount("WT1",Status.Draft, new Date(2021,3,21,12,16)));
    this.allWorkAccounts.push(new WorkAccount("WT2",Status.Draft, new Date(2021,3,25,12,0)));
    this.allWorkAccounts.push(new WorkAccount("WT3",Status.Submitted, new Date(2021,3,11,11,0)));
    this.allWorkAccounts.push(new WorkAccount("WT4",Status.Submitted, new Date(2021,3,22,12,45)));
    
    this.filteredWorkAccounts = new Array<WorkAccount>();

    this.allWorkAccounts.forEach(element => {
      this.filteredWorkAccounts.push(element);
    });

    this.statusFilter = false;
    this.beforeDateFilter = false;
    this.afterDateFilter = false;
    this.viewAllFilter = true;
  }

  filterWorkAccounts(){
    this.statusFilter = false;
    this.beforeDateFilter = false;
    this.afterDateFilter = false;
    this.viewAllFilter = true;
    this.filteredWorkAccounts = new Array<WorkAccount>(); 

    if(this.getFilterFieldValue("workAccountsStatusFilter") !== "Select one..."){
      this.statusFilter = true;
      if(this.getFilterFieldValue("workAccountsStatusFilter") === "Draft"){
        this.status = Status.Draft;
      }else{
        this.status = Status.Submitted;
      }
    }
    console.log(this.getFilterFieldValue("workAccountsStatusFilter"));

    if(this.getFilterFieldValue("workAccountsBeforeDateFilter")){
      console.log(this.getFilterFieldValue("workAccountsBeforeDateFilter"));
      this.beforeDateFilter = true;
      this.beforeDate = new Date(this.getFilterFieldValue("workAccountsBeforeDateFilter"));
    }
    if(this.getFilterFieldValue("workAccountsAfterDateFilter")){
      console.log(this.getFilterFieldValue("workAccountsAfterDateFilter"));
      this.afterDateFilter = true;
      this.afterDate = new Date(this.getFilterFieldValue("workAccountsAfterDateFilter"));
    }
    if(this.getFilterFieldValue("workAccountsViewFilter") === "Mine"){ //treba implementirati filter po ekipi kad se implementira tacka za ekipe
      this.viewAllFilter = false;
    }
    console.log(this.getFilterFieldValue("workAccountsViewFilter"));

    
    this.allWorkAccounts.forEach(element => {
      var toAdd = true;
      if(this.statusFilter){
        if(element.status == this.status){
          toAdd = true;
        }else{
          toAdd = false;
        }
      }
      if(this.beforeDateFilter && toAdd){
        if(element.startDate <= this.beforeDate){
          toAdd = true;
        }else{
          toAdd = false;
        }
      }
      if(this.afterDateFilter && toAdd){
        if(element.startDate >= this.afterDate){
          toAdd = true;
        }else{
          toAdd = false;
        }
      }
      if(toAdd){
        this.filteredWorkAccounts.push(element);
      }
    });
  }

  resetFilter(){
    this.filteredWorkAccounts = new Array<WorkAccount>();
    this.allWorkAccounts.forEach(element => {
      this.filteredWorkAccounts.push(element);
    });
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

}
