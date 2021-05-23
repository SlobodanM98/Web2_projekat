import { Address } from "./address";
import { User } from "./user";

export enum Reason{
    NemaStruje,
    PostojiKvar,
    TreperenjeSvetla,
    PovratakStruje,
    DelimicnaStruja,
    ProblemiSNaponom
}

export class Call {
    public reason : Reason;
    public comment : string;
    public priority : number;
    public address : Address;

    constructor(reason : Reason, comment : string, priority : number, address : Address){
        this.reason = reason;
        this.comment = comment;
        this.priority = priority;
        this.address = address;
    }
}
