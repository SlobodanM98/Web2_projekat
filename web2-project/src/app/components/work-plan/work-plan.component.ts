import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Address } from 'src/app/model/address';
import { Call } from 'src/app/model/call';
import { Device } from 'src/app/model/device';
import { Incident, IncidentType } from 'src/app/model/incident';
import { Team } from 'src/app/model/team/team.model';
import { Role, User } from 'src/app/model/user';
import { Status, WorkPlan } from 'src/app/model/work-plan';
import { AddToProceedService } from 'src/app/services/add-to-proceed.service';
import { WorkPlanService } from 'src/app/services/work-plan.service';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {

  allWorkPlans: Array<WorkPlan>;
  filteredWorkPlans: Array<WorkPlan>;

  statusFilter: boolean;
  beforeDateFilter: boolean;
  afterDateFilter: boolean;
  viewAllFilter: boolean; //true -> All, false -> Mine

  status: Status;
  beforeDate: Date;
  afterDate: Date;

  role: string;

  constructor(private addToProceed: AddToProceedService, private workPlanService: WorkPlanService) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);
    this.role = DecodedToken.role;

    this.addToProceed.canReturn = true;

    this.allWorkPlans = new Array<WorkPlan>();
    this.filteredWorkPlans = new Array<WorkPlan>();

    this.allWorkPlans.forEach(element => {
      this.filteredWorkPlans.push(element);
    });

    this.workPlanService.getWorkPlan().subscribe(data=>{
      this.allWorkPlans = new Array<WorkPlan>();
      this.allWorkPlans = data;
      this.filteredWorkPlans = new Array<WorkPlan>();

      this.allWorkPlans.forEach(element => {
        this.filteredWorkPlans.push(element);
      });
    });

    this.statusFilter = false;
    this.beforeDateFilter = false;
    this.afterDateFilter = false;
    this.viewAllFilter = true;
  }

  filterWorkPlans(){
    this.statusFilter = false;
    this.beforeDateFilter = false;
    this.afterDateFilter = false;
    this.viewAllFilter = true;
    this.filteredWorkPlans = new Array<WorkPlan>(); 

    if(this.getFilterFieldValue("workPlanStatusFilter") !== "Select one..."){
      this.statusFilter = true;
      if(this.getFilterFieldValue("workPlanStatusFilter") === "Draft"){
        this.status = Status.Draft;
      }else{
        this.status = Status.Approved;
      }
    }
    console.log(this.getFilterFieldValue("workPlanStatusFilter"));

    if(this.getFilterFieldValue("workPlanBeforeDateFilter")){
      console.log(this.getFilterFieldValue("workPlanBeforeDateFilter"));
      this.beforeDateFilter = true;
      this.beforeDate = new Date(this.getFilterFieldValue("workPlanBeforeDateFilter"));
    }
    if(this.getFilterFieldValue("workPlanAfterDateFilter")){
      console.log(this.getFilterFieldValue("workPlanAfterDateFilter"));
      this.afterDateFilter = true;
      this.afterDate = new Date(this.getFilterFieldValue("workPlanAfterDateFilter"));
    }
    if(this.getFilterFieldValue("workPlanViewFilter") === "Mine"){ //treba implementirati filter po ekipi kad se implementira tacka za ekipe
      this.viewAllFilter = false;
    }
    console.log(this.getFilterFieldValue("workPlanViewFilter"));

    
    this.allWorkPlans.forEach(element => {
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
        this.filteredWorkPlans.push(element);
      }
    });
  }

  resetFilter(){
    this.filteredWorkPlans = new Array<WorkPlan>();
    this.allWorkPlans.forEach(element => {
      this.filteredWorkPlans.push(element);
    });
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  workPlanClick(workPlan: WorkPlan){

  }
}
