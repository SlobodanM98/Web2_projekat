export enum Role {
    TeamMember,
    Dispatcher,
    Worker,
    Consumer,
    Admin
}

export class User {
   
    public username: string;
    public firstName: string;
    public lastName: string;
    public password:string;
    public birthDate:Date;
    public address:string;
    public email: string
    public Role:Role;
    public selecetdFile?: File;

   

    constructor(username:string, first:string, last:string, password:string, bd:Date,addr:string, email:string, rola:Role, file?:File)
    {
       
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.birthDate = bd;
        this.address = addr;
        this.Role = rola;
        this.selecetdFile = file;
      
    }
}