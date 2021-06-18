import { User } from "../user";

export class Team {
    public teamID: number;
    public name: string;
    public teamUsers:Array<string>;

    constructor(name: string, members:Array<string>) {
        this.name = name;
        this.teamUsers = members;
    } 
}
