export class Address {
    public addressID: number;
    public street: string;
    public number: number;
    public city: string;
    public postalNumber: number;
    public priority: number;

    constructor(addressID: number, street: string, number: number, city : string, postalNumber : number, priority: number){
        this.addressID = addressID;
        this.street = street;
        this.number = number;
        this.city = city;
        this.postalNumber = postalNumber;
        this.priority = priority;
    }
}
