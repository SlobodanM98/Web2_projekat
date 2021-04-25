export enum Type{
    Residential,
    Commercial
}

export class Consumer {//fali prioritet
    constructor(public name: string, public lastName: string, public location: string, public phoneNumber: number, public id: number, public type: Type){}
}
