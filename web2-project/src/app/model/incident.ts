
export enum IncidentType
{
    Planiran,
    Neplaniran
}


//nezavrsena klasa
export class Incident {
    public ID:string;
    private Tip:IncidentType;
    private Prioritet:number;
    private Potvrdjen:boolean;
    public Status:string;
    public  Uzrok:string;
    public  Poduzrok:string;
    public  Konstrukcija:string;
    public  Materijal:string;
    private ETA:string;
    private ATA:string;
    public VremeIncidenta:string;
    private ETR:string;
    private NivoNapona:number;
    private PVR:string; //planirano vreme rada

    constructor(id:string,tip:IncidentType,prioritet:number,status:string,eta:string,ata:string,vremeincidenta:string,etr:string,nivonapona:number,pvr:string)
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
    }
}


