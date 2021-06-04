import { Address } from "./address";
import { Device } from "./device";
import { Incident } from "./incident";
import { Team } from "./team/team.model";
import { User } from "./user";
import { WorkAccount } from "./work-account";

export enum Status{
    Draft,
    Approved,
    Denied,
    Canceled,
    Finished
}

export enum Type{
    Planned,
    Unplanned
}

export class WorkPlan {// treba da se doda nalog za rad
    public workPlanID: number;
    public type: Type;
    public workAccount?: WorkAccount;
    public status: Status;
    public incident?: Incident;
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

    constructor(type: Type, address: Address, team: Team, createdBy: User, startDate: Date, endDate: Date, purpose: string, notes: string, company: string, phone: number, creationDate: Date, equipment : Device, incident?: Incident, workAccount?: WorkAccount){
        this.type = type;
        this.workAccount = workAccount;
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