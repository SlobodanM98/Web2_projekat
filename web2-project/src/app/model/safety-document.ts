export enum TipDokumenta {
    PlaniraniRad,
    NeplaniraniRad
}


export class SafetyDocument {

    private TipDokumenta: TipDokumenta;
    private PlanRada:string;
    private Author:string;
    private Team:string;
    private Details:string;
    private Notes:string;
    private PhoneNum:string;
    private dateOfCreation:Date;


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
