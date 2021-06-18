import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { Consumer, Type } from 'src/app/model/consumer';
import { Notification, NotificationType } from 'src/app/model/notification-description/notification.module';

import { ConsumerService } from 'src/app/services/consumer.service';
import { NotificationService } from 'src/app/services/notification.service';

export interface TableElement{
  id: number;
  name: string;
  lastName: string;
  postalNumber: number;
  city: string;
  street: string;
  number: number;
  phoneNumber: number;
  type: string;
}

@Component({
  selector: 'app-consumers-filtered',
  templateUrl: './consumers-filtered.component.html',
  styleUrls: ['./consumers-filtered.component.css']
})
export class ConsumersFilteredComponent implements OnInit, AfterViewInit {

  @Input() filteredData : Array<Consumer>;
  @Input() allAddresses : Array<Address>;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'postalNumber', 'city', 'street', 'number', 'phoneNumber', 'type', 'actions'];
  dataSource: any;
  tableElements: Array<TableElement>;

  editConsumerForm: FormGroup;

  deleteConsumerID: number;
  consumerForEdit: Consumer;

  notification: Notification;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private consumerService : ConsumerService, private notificationService: NotificationService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.editConsumerForm = this.formBuilder.group({
      id: ['', [
      ]],
      name: ['', [
      ]],
      lastName: ['', [
      ]],
      address: ['', [
      ]],
      phoneNumber: ['', [
      ]],
      type: ['', [
      ]]
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes : SimpleChange){
    this.tableElements = new Array<TableElement>();
    this.filteredData.forEach(element => {
      var data : TableElement = {id: element.consumerID, name: element.firstName, lastName: element.lastName, postalNumber: element.address.postalNumber, city: element.address.city, street: element.address.street, number: element.address.number, phoneNumber: element.phoneNumber, type: Type[element.type].toString()};
      this.tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  edit(element: TableElement, content: any){
    var type : Type;

    if(element.type === "Residential"){
      type = Type.Residential;
    }else{
      type = Type.Commercial;
    }

    this.allAddresses.forEach(address => {
      if(address.city === element.city && address.number === element.number && address.postalNumber === element.postalNumber && address.street === element.street){
        this.consumerForEdit = new Consumer(element.name, element.lastName, address, element.phoneNumber, type);
        this.consumerForEdit.consumerID = element.id;
      }
    });

    this.modalService.open(content, {ariaLabelledBy: 'modal-edit'});
  }

  delete(element: TableElement, contentDelete: any){
    this.deleteConsumerID = element.id;
    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-delete'});
  }

  submitEdit(){
    this.modalService.dismissAll();

    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].id === this.consumerForEdit.consumerID){
        if(this.editConsumerForm.controls['name'].value){
          this.consumerForEdit.firstName = this.editConsumerForm.controls['name'].value;

          this.tableElements[i].name = this.editConsumerForm.controls['name'].value;
        }
        if(this.editConsumerForm.controls['lastName'].value){
          this.consumerForEdit.lastName = this.editConsumerForm.controls['lastName'].value;

          this.tableElements[i].lastName = this.editConsumerForm.controls['lastName'].value;
        }
        if(this.editConsumerForm.controls['address'].value){
          for(var j = 0; j < this.allAddresses.length; j++){
            if(this.allAddresses[j].addressID === Number(this.editConsumerForm.controls['address'].value)){
              this.consumerForEdit.address = this.allAddresses[j];
              this.consumerForEdit.priority = this.allAddresses[j].priority;

              this.tableElements[i].city = this.allAddresses[j].city;
              this.tableElements[i].number = this.allAddresses[j].number;
              this.tableElements[i].postalNumber = this.allAddresses[j].postalNumber;
              this.tableElements[i].street = this.allAddresses[j].street;
              break;
            }
          };
        }
        if(this.editConsumerForm.controls['phoneNumber'].value){
          this.consumerForEdit.phoneNumber = this.editConsumerForm.controls['phoneNumber'].value;

          this.tableElements[i].phoneNumber = this.editConsumerForm.controls['phoneNumber'].value;
        }
        if(this.editConsumerForm.controls['type'].value){
          var type : Type;

          if(this.editConsumerForm.controls['type'].value === "Residential"){
            type = Type.Residential;
          }else{
            type = Type.Commercial;
          }

          this.consumerForEdit.type = type;

          this.tableElements[i].type = this.editConsumerForm.controls['type'].value;
        }
        break;
      }
    }

    this.consumerService.putConsumer(this.consumerForEdit).subscribe(data =>{
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Consumer changed successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    }, error => {
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Consumer changed unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    });

    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.editConsumerForm.reset();
  }

  onNotificationClick(){
    if(!this.notification.isRead){
      this.notificationService.getNotifications().subscribe(data=>{
        data[data.length - 1].isRead = true;
        this.notificationService.putNotification(data[data.length - 1]).subscribe();
      });
    }
  }

  hasInput(){
    if(this.editConsumerForm.controls['id'].value || this.editConsumerForm.controls['name'].value 
      || this.editConsumerForm.controls['lastName'].value || this.editConsumerForm.controls['address'].value
        || this.editConsumerForm.controls['phoneNumber'].value || this.editConsumerForm.controls['type'].value){
          return true;
    }else{
      return false;
    }
  }

  confirmDelete(){
    this.modalService.dismissAll();

    this.consumerService.deleteConsumer(this.deleteConsumerID).subscribe(data=>{
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Consumer deleted successfully!", NotificationType.Success, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    }, error => {
      const helper = new JwtHelperService();
      var token : any = localStorage.getItem('token');
      const DecodedToken = helper.decodeToken(token);
      
      this.notification = new Notification(DecodedToken.id, "Consumer deleted unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    });

    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].id === this.deleteConsumerID){
        this.tableElements.splice(i, 1);
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}