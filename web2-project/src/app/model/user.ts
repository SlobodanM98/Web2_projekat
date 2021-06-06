import { Address } from "./address";

export enum Role {
    TeamMember,
    Dispatcher,
    Worker,
    Consumer,
    Admin
}

export class User {
    public userID: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public password:string;
    public birthDate:Date;
    public addressID: number;
    public email: string;
    public Role:Role;
    public selecetdFile?: File;

   

    constructor(username:string, first:string, last:string, password:string, bd:Date,addrID:number, email:string, rola:Role, file?:File)
    {
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.password = password;
        this.email = email;
        this.birthDate = bd;
        this.addressID = addrID;
        this.Role = rola;
        this.selecetdFile = file;
    }
}