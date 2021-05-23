import { Address } from "./address";

export enum Role {
    TeamMember,
    Dispatcher,
    Worker,
    Consumer,
    Admin
}

export class User {
    public userID: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public password:string;
    public birthDate:Date;
    public address: Address;
    public email: string
    public Role:Role;
    public selecetdFile?: File;

   

    constructor(userID: number, username:string, first:string, last:string, password:string, bd:Date,addr:Address, email:string, rola:Role, file?:File)
    {
        this.userID = userID;
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.password = password;
        this.email = email;
        this.birthDate = bd;
        this.address = addr;
        this.Role = rola;
        this.selecetdFile = file;
    }
}