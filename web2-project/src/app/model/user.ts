export class User {
   
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string

    private age: number;

    constructor(username:string, first:string, last:string, email: string)
    {
       
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.email = email
      
    }


}
