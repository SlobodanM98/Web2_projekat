import { Incident } from './incident';
import { Address } from './address';
import { Device } from './device';
import { User } from './user';

export enum Type{
    PlannedWork,
    UnplannedWork
}

export enum Status{
    Draft,
    Approved,
    Denied,
    Canceled,
    Finished
}

export class WorkAccount {
    constructor(public id:string, public type: Type, public status: Status, public incident: Incident, public street: Address, public startDate: Date,
 public endDate: Date, public created: string, public purpose: string, public notes: string, public urgentWork : boolean, public company: string,
 public phone: number, public creationDate: Date, public equipment : Device, public history : Array<WorkAccountStatusHistory>){}
}

export class WorkAccountStatusHistory{
    public date: Date;
    public changedBy: User;
    public status: Status;

    constructor(date: Date, user: User, status: Status){
        this.date = date;
        this.changedBy = user;
        this.status = status;
    }
}