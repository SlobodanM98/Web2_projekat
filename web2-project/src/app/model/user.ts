export class User {
   
    public username: string;
    public firstName: string;
    public lastName: string;

    private age: number;

    constructor(username:string, first:string, last:string)
    {
       
        this.username = username;
        this.firstName = first;
        this.lastName = last;
      
    }


}
