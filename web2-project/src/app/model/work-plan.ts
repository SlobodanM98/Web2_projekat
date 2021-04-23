export enum Status{
    Draft,
    Submitted
}

export class WorkPlan {
    constructor(public id: string, public status: Status, public startDate: Date){} //treba da se doda ekipa, cim bude bila odradjena tacka za ekipe
}