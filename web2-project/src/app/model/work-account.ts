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
    Canceled
}

export class WorkAccount {
    constructor(public workAccountID:string, public type: Type, public status: Status, public incident: Incident, public address: Address, public startDate: Date,
 public endDate: Date, public created: Date, public purpose: string, public notes: string, public urgentWork : boolean, public company: string,
 public phoneNumber: number, public creationDate: Date, public equipment : Device, public workAccountStatusHistory : WorkAccountStatusHistory){}
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