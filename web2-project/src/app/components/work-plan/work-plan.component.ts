import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { Call } from 'src/app/model/call';
import { Device } from 'src/app/model/device';
import { Incident, IncidentType } from 'src/app/model/incident';
import { Team } from 'src/app/model/team/team.model';
import { Role, User } from 'src/app/model/user';
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
    this.allWorkPlans.push(new WorkPlan("WT1", new Incident("INC1", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "prv", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "","","",""), new Address(1,"", 1,"",1, 1), new Team("","", new Array<User>()), new User(1,"","","","",new Date(), new Address(1,"", 1,"",1, 1),"",Role.Consumer),new Date(),new Date(),"","","",1,new Date(),new Device()));
    this.allWorkPlans.push(new WorkPlan("WT2", new Incident("INC2", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "prv", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "","","",""), new Address(1,"", 1,"",1, 1), new Team("","", new Array<User>()), new User(1,"","","","",new Date(), new Address(1,"", 1,"",1, 1),"",Role.Consumer),new Date(),new Date(),"","","",1,new Date(),new Device()));
    this.allWorkPlans.push(new WorkPlan("WT3", new Incident("INC3", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "prv", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "","","",""), new Address(1,"", 1,"",1, 1), new Team("","", new Array<User>()), new User(1,"","","","",new Date(), new Address(1,"", 1,"",1, 1),"",Role.Consumer),new Date(),new Date(),"","","",1,new Date(),new Device()));
    this.allWorkPlans.push(new WorkPlan("WT4", new Incident("INC4", IncidentType.Neplaniran, 1, "status", "eta", "ata", "time", "etr", 100, "prv", new Array<Device>(), new Array<Call>(), new Team("","", new Array<User>()), "","","",""), new Address(1,"", 1,"",1, 1), new Team("","", new Array<User>()), new User(1,"","","","",new Date(), new Address(1,"", 1,"",1, 1),"",Role.Consumer),new Date(),new Date(),"","","",1,new Date(),new Device()));
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
