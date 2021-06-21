import {WorkPlan} from 'src/app/model/work-plan';
import { Team } from './team/team.model';


export enum TipDokumenta {
    PlaniraniRad,
    NeplaniraniRad
}


export class SafetyDocument {
    public id:number;
    public tipDokumenta: TipDokumenta;
    public status:string;
    public planRada:number;
    public author:string;
    public team:number;
    public details:string;
    public notes:string;
    public phoneNum:string;
    public dateOfCreation:Date;
    public SafetyOp:boolean;
    public tagsRemoved:boolean;
    public groundingRemoved:boolean;
    public readyForService:boolean;


   
}
