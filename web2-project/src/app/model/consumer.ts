import { Address } from "./address";

export enum Type{
    Residential,
    Commercial
}

export class Consumer {
    public consumerID: number;
    public firstName: string;
    public lastName: string;
    public address: Address;
    public priority: number;
    public phoneNumber: number;
    public type: Type;

    constructor(firstName: string, lastName: string, address: Address, phoneNumber: number, type: Type){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.priority = address.priority;
        this.phoneNumber = phoneNumber;
        this.type = type;
    }
}
