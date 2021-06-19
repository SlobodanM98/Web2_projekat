import { Device } from "./device";

export enum InstructionStatus{
    Executed,
    Unexecuted
}

export class WorkInstruction {
    public instructionID: number;
    public device: Device;
    public description: string;
    public status: InstructionStatus;
    public workPlanID: number;

    constructor(device: Device, description: string, workPlanID: number){
        this.device = device;
        this.description = description;
        this.status = InstructionStatus.Unexecuted;
        this.workPlanID = workPlanID;
     }
}
