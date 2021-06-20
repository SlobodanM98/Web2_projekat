import { User } from "../user";

export class Team {
    public teamID: number;
    public name: string;
    public teamUsers:Array<TeamUser>;

    constructor(name: string, members:Array<TeamUser>) {
        this.name = name;
        this.teamUsers = members;
    } 
}


export class TeamUser {
    public id: number;
    public teamID: number;
    public userID: string;

    constructor(userID: string) {
        this.userID = userID;
    } 
}
