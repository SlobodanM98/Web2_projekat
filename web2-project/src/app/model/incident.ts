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
    public ID:number;
    //public userID:number;
    //public crewID:number;
    public Tip:IncidentType;
    public Prioritet:number = 0;
    public Potvrdjen:boolean;
    public Status:string;
    public ETA:string;
    public ATA:string;
    public VremeIncidenta:string;
    public ETR:string;
    public NivoNapona:number;
    public PVR:string; //planirano vreme rada
    //public Devices:Array<Device>;
    //public Calls:Array<Call>;
    //public Team:Team;
    public Uzrok:string;
    public Poduzrok:string;
    public Konstrukcija:string;
    public Materijal:string;

    constructor(tip:IncidentType,status:string,eta:string,ata:string,vremeincidenta:string,etr:string,nivonapona:number,pvr:string)
    {
       
        this.Tip = tip;
        //this.Prioritet = 0;
        //this.Potvrdjen = false;
        this.Status = status;
        this.ETA = eta;
        this.ATA = ata;
        this.VremeIncidenta = vremeincidenta;
        this.ETR = etr;
        this.NivoNapona = nivonapona;
        this.PVR = pvr;
        //this.Uzrok = "";
        //this.Poduzrok = "";
        //this.Konstrukcija = "";
        //this.Materijal = "";
        
        
    }
}


