export enum Status{
    Draft,
    Submitted
}

export class WorkAccount {
    constructor(public id:string, public status: Status, public startDate: Date){}
}