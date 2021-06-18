import {WorkPlan} from 'src/app/model/work-plan';
import { Team } from './team/team.model';


export enum TipDokumenta {
    PlaniraniRad,
    NeplaniraniRad
}


export class SafetyDocument {
    public ID:number;
    public TipDokumenta: TipDokumenta;
    public PlanRada:string;
    public Author:string;
    public Team:Team;
    public Details:string;
    public Notes:string;
    public PhoneNum:string;
    public dateOfCreation:Date;


    constructor(tip:TipDokumenta, plan:string, author:string,team:Team,details:string, notes:string, telBroj:string, d:Date)
    {
        this.TipDokumenta = tip;
        this.PlanRada = plan;
        this.Author = author;
        this.Team = team;
        this.Details = details;
        this.Notes = notes;
        this.PhoneNum = telBroj;
        this.dateOfCreation = d;
        
    }
}
