import { Address } from "./address";
import { Device } from "./device";
import { Incident } from "./incident";
import { Team } from "./team/team.model";
import { User } from "./user";

export enum Status{
    Draft,
    Approved,
    Denied,
    Canceled,
    Finished
}

export class WorkPlan {// treba da se doda nalog za rad
    public id: string;
    public status: Status;
    public incident: Incident;
    public address: Address;
    public team: Team;
    public createdBy: User;
    public startDate: Date;
    public endDate: Date;
    public purpose: string;
    public notes: string;
    public company: string;
    public phone: number;
    public creationDate: Date;
    public statusHistory: Array<WorkPlanStatusHistory>;
    public equipment : Device

    constructor(id: string, incident: Incident, address: Address, team: Team, createdBy: User, startDate: Date, endDate: Date, purpose: string, notes: string, company: string, phone: number, creationDate: Date, equipment : Device){
        this.id = id;
        this.status = Status.Draft;
        this.incident = incident;
        this.address = address;
        this.team = team;
        this.createdBy = createdBy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.purpose = purpose;
        this.notes = notes;
        this.company = company;
        this.phone = phone;
        this.creationDate = creationDate;
        this.statusHistory = new Array<WorkPlanStatusHistory>();
        this.statusHistory.push(new WorkPlanStatusHistory(this.creationDate, this.createdBy, this.status));
        this.equipment = equipment;
    }
}

export class WorkPlanStatusHistory{
    public date: Date;
    public changedBy: User;
    public status: Status;

    constructor(date: Date, user: User, status: Status){
        this.date = date;
        this.changedBy = user;
        this.status = status;
    }
}