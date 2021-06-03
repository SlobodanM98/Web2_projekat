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
    public callID : number;
    public reason : Reason;
    public comment ?: string;
    public priority : number;
    public address : Address;
    public firstName ?: string;
    public lastName ?: string;

    constructor(reason : Reason, priority : number, address : Address, firstName?: string, lastName?: string, comment ?: string){
        this.reason = reason;
        this.comment = comment;
        this.priority = priority;
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
