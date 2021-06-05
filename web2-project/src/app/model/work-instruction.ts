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

    constructor(device: Device, description: string){
        this.device = device;
        this.description = description;
        this.status = InstructionStatus.Unexecuted;
     }
}
