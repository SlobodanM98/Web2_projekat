import { Call } from "./call";
import { Device } from "./device";
import { Team } from "./team/team.model";

export enum IncidentType
{
    Planiran,
    Neplaniran
}


//nezavrsena klasa
export class Incident {
    public id:number;
    public userID:string;
    //public crewID:number;
    public tip:IncidentType;
    public prioritet:number = 0;
    public potvrdjen:boolean;
    public status:string;
    public eta:Date;
    public ata:Date;
    public vremeIncidenta:Date;
    public etr:Date;
    public nivoNapona:number;
    public pvr:Date; //planirano vreme rada
    public Devices:Array<Device>;
    public Calls:Array<Call>;
    public Team:Team;
    public uzrok:string;
    public poduzrok:string;
    public konstrukcija:string;
    public materijal:string;


    /*
    constructor(tip:IncidentType,status:string,eta:string,ata:string,vremeincidenta:string,etr:string,nivonapona:number,pvr:string)
    {
       
        this.tip = tip;
        //this.Prioritet = 0;
        //this.Potvrdjen = false;
        this.status = status;
        this.eta = eta;
        this.ata = ata;
        this.vremeIncidenta = vremeincidenta;
        this.etr = etr;
        this.nivoNapona = nivonapona;
        this.pvr = pvr;
        this.Devices = new  Array<Device>();
        this.Calls = new Array<Call>();
        //this.Uzrok = "";
        //this.Poduzrok = "";
        //this.Konstrukcija = "";
        //this.Materijal = "";
        
        
    }*/
}


