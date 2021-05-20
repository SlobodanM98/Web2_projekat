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
    public ID:string;
    public Tip:IncidentType;
    public Prioritet:number;
    public Potvrdjen:boolean;
    public Status:string;
    public ETA:string;
    public ATA:string;
    public VremeIncidenta:string;
    public ETR:string;
    public NivoNapona:number;
    public PVR:string; //planirano vreme rada
    public Devices:Array<Device>;
    public Calls:Array<Call>;
    public Team:Team;
    public Uzrok:string;
    public Poduzrok:string;
    public Konstrukcija:string;
    public Materijal:string;

    constructor(id:string,tip:IncidentType,prioritet:number,status:string,eta:string,ata:string,vremeincidenta:string,etr:string,nivonapona:number,pvr:string, devices : Array<Device>, calls : Array<Call>, team : Team, poduzrok : string, uzrok : string, konstrukcija : string, materijal : string)
    {
        this.ID = id;
        this.Tip = tip;
        this.Prioritet = prioritet;
        this.Status = status;
        this.ETA = eta;
        this.ATA = ata;
        this.VremeIncidenta = vremeincidenta;
        this.ETR = etr;
        this.NivoNapona = nivonapona;
        this.PVR = pvr;
        this.Devices = devices;
        this.Calls = calls;
        this.Team = team;
        this.Poduzrok = poduzrok;
        this.Uzrok = uzrok;
        this.Konstrukcija = konstrukcija;
        this.Materijal = materijal;
    }
}


