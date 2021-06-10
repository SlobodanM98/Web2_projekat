import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { User, Status, Role } from 'src/app/model/user';
//import {} from '../../../../../Web2BackEnd/Web2BackEnd/StaticFiles/Images/grad.jpg'

@Component({
  selector: 'app-view-all-profiles',
  templateUrl: './view-all-profiles.component.html',
  styleUrls: ['./view-all-profiles.component.css']
})
export class ViewAllProfilesComponent implements OnInit {

  closeResult = '';
  usernameModel='';
  emailModel="";
  firstNameModel = ""
  lastNameModel = "";
  birthDateModel: Date;
  addressModel = "";
  roleModel: Role;
  statusModel: Status;
  allUsers: Array<User>;

  listaProfila: { username: string, role: Role, status: Status }[] = [
      { "username": "pera", "role": Role.Dispatcher, "status": Status.Accepted },
      { "username": 'luka', "role": Role.TeamMember, "status": Status.Accepted },
      { "username": 'goran', "role": Role.Consumer, "status": Status.Rejected }
  ];

  constructor(private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.allUsers = new Array<User>();
    this.userService.getUsersEmailConfirme().subscribe(data=> {
      this.allUsers = data;
      console.log(this.allUsers);
      var re = /\\/gi; 
      //var str = "Apples are round, and apples are juicy.";
      var newstr = this.allUsers[0].productImage?.imagePath.replace(re, "/"); 
      console.log('../../../../../Web2BackEnd/Web2BackEnd/' + this.allUsers[0].productImage?.imagePath);
      console.log('../../../../../Web2BackEnd/Web2BackEnd/' + newstr);
    });

  }
  

  open(content:any, index:number) {
    this.usernameModel=this.allUsers[index].userName;
    this.emailModel = this.allUsers[index].email;
    this.firstNameModel = this.allUsers[index].firstName;
    this.lastNameModel = this.allUsers[index].lastName;
    this.birthDateModel = this.allUsers[index].birthDate;
    this.roleModel=this.allUsers[index].role;
    this.statusModel=this.allUsers[index].status;
    this.userService.getAddress(this.allUsers[index].addressID).subscribe(data=>{
      this.addressModel = data.street + " " + data.number;
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result : any) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == 'Accept click'){
        this.allUsers[index].status = this.status.Accepted;
        console.log('Accept click');
      }
      else {
        this.allUsers[index].status = this.status.Rejected;
        console.log('Accept click222');
      }
      this.userService.updateStatus(this.allUsers[index]).subscribe(data=>{
        
      });
    }, (reason : any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public get status(): typeof Status {
    return Status; 
  }

  public get role(): typeof Role {
    return Role; 
  }

}
