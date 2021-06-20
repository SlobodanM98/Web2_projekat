import {WorkPlan} from 'src/app/model/work-plan';
import { Team } from './team/team.model';


export enum TipDokumenta {
    PlaniraniRad,
    NeplaniraniRad
}


export class SafetyDocument {
    public ID:number;
    public Tip: TipDokumenta;
    public Status:string;
    public PlanRada:number;
    public Author:string;
    public Team:number;
    public Details:string;
    public Notes:string;
    public PhoneNum:string;
    public dateOfCreation:Date;


   
}
