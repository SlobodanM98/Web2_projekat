import { Address } from "./address";

export enum Role {
    TeamMember,
    Dispatcher,
    Worker,
    Consumer,
    Admin
}

export enum Status {
    Accepted,
	Rejected,
	Processing
}

export class User {
    public id: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public password:string;
    public birthDate:Date;
    public addressID: number;
    public email: string;
    public role:Role;
    public status: Status;
    public selecetdFile?: File;
    public productImage?: ProductImage

   

    constructor(username:string, first:string, last:string, password:string, bd:Date,addrID:number, email:string, rola:Role, file?:File)
    {
        this.userName = username;
        this.firstName = first;
        this.lastName = last;
        this.password = password;
        this.email = email;
        this.birthDate = bd;
        this.addressID = addrID;
        this.role = rola;
        this.selecetdFile = file;
    }
}

export class ProductImage {

    public productImageId: number;
    public imagePath: string;
    public image: File;
}