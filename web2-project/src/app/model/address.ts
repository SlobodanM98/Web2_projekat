export class Address {
    public street: string;
    public number: number;
    public priority: number;

    constructor(street: string, number: number, priority: number){
        this.street = street;
        this.number = number;
        this.priority = priority;
    }
}
