export enum IncidentType
{
    Planiran,
    Neplaniran
}


//nezavrsena klasa
export class Incident {
    private ID:string;
    private Tip:IncidentType;
    private Prioritet:number;
    private Potvrdjen:boolean;
    private Status:string;
    private ETA:string;
    private ATA:string;
    private VremeIncidenta:string;
    private ETR:string;
    private NivoNapona:number;
    private PVR:string; //planirano vreme rada
    


}
