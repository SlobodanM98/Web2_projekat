import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Status, WorkPlan } from 'src/app/model/work-plan';

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

  constructor() { }

  ngOnInit(): void {
    this.allWorkPlans = new Array<WorkPlan>();
    this.allWorkPlans.push(new WorkPlan("WT1",Status.Draft, new Date(2021,3,21,12,16)));
    this.allWorkPlans.push(new WorkPlan("WT2",Status.Draft, new Date(2021,3,25,12,0)));
    this.allWorkPlans.push(new WorkPlan("WT3",Status.Submitted, new Date(2021,3,11,11,0)));
    this.allWorkPlans.push(new WorkPlan("WT4",Status.Submitted, new Date(2021,3,22,12,45)));
    
    this.filteredWorkPlans = new Array<WorkPlan>();

    this.allWorkPlans.forEach(element => {
      this.filteredWorkPlans.push(element);
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
        this.status = Status.Submitted;
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
}
