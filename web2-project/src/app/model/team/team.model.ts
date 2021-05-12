import { User } from "../user";

export class Team {
    constructor(public id: string, public name: string, public members:Array<User>){} 
}
