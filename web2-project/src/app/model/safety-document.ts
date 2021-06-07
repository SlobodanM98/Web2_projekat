import {WorkPlan} from 'src/app/model/work-plan';


export enum TipDokumenta {
    PlaniraniRad,
    NeplaniraniRad
}


export class SafetyDocument {

    public TipDokumenta: TipDokumenta;
    public PlanRada:string;
    public Author:string;
    public Team:string;
    public Details:string;
    public Notes:string;
    public PhoneNum:string;
    public dateOfCreation:Date;


    constructor(tip:TipDokumenta, plan:string, author:string, details:string, notes:string, telBroj:string)
    {
        this.TipDokumenta = tip;
        this.PlanRada = plan;
        this.Author = author;
        this.Team = "123";
        this.Details = details;
        this.Notes = notes;
        this.PhoneNum = telBroj;
    }
}
