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
    public workAccountID:number;
    public type: Type;
    public status: Status;
    public incidentID: number;
    public address: Address;
    public startDate: Date;
    public endDate: Date;
    public created: string;
    public purpose: string;
    public notes: string;
    public urgentWork : boolean;
    public company: string;
    public phoneNumber: string;
    public creationDate: Date;
    public equipment : Device;
    public workAccountStatusHistory?: WorkAccountStatusHistory;


    constructor(type: Type, status: Status, incidentID: number, address: Address, startDate: Date, endDate: Date, created: string,
        purpose: string, notes: string, urgentWork : boolean, company: string, phoneNumber: string, creationDate: Date, workAccountStatusHistory?: WorkAccountStatusHistory) {
            this.status = status;
            this.type = type;
            this.incidentID = incidentID;
            this.address = address;
            this.startDate = startDate;
            this.endDate = endDate;
            this.created = created;
            this.purpose = purpose;
            this.notes = notes;
            this.urgentWork = urgentWork;
            this.company = company;
            this.phoneNumber = phoneNumber;
            this.creationDate = creationDate;
            this.workAccountStatusHistory = workAccountStatusHistory;
        }
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