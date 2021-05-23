import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/model/address';
import { Consumer, Type } from 'src/app/model/consumer';
import { ConsumerService } from 'src/app/services/consumer.service';
import { ConsumersFilteredComponent } from './consumers-filtered/consumers-filtered.component';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css']
})
export class ConsumersComponent implements OnInit {

  allConsumers: Array<Consumer>;
  filteredConsumers: Array<Consumer>;

  allAddresses: Array<Address>;

  typeFilter: boolean;

  typeValue: Type;

  addConsumerForm: FormGroup;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal, private consumerService: ConsumerService) { }

  ngOnInit(): void {
    this.allConsumers = new Array<Consumer>();
    this.filteredConsumers = new Array<Consumer>();
    this.allAddresses = new Array<Address>();

    this.consumerService.getConsumers().subscribe(data => {
      this.allConsumers = data;
      this.filteredConsumers = new Array<Consumer>();
      this.allConsumers.forEach(element => {
        this.filteredConsumers.push(element);
      });
    });

    this.consumerService.getAddress().subscribe(data => {
      this.allAddresses = data;
    });

    this.typeFilter = false;

    this.addConsumerForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]],
      type: ['', [
        Validators.required
      ]]
    });
  }

  filterConsumers(){
    this.typeFilter = false;
    this.filteredConsumers = new Array<Consumer>();

    if(this.getFilterFieldValue('consumerTypeFilter') !== "Select one..."){
      if(this.getFilterFieldValue('consumerTypeFilter') === "Residential"){
        this.typeFilter = true;
        this.typeValue = Type.Residential;
      }else{
        this.typeFilter = true;
        this.typeValue = Type.Commercial;
      }
    }

    this.allConsumers.forEach(element => {
      var toAdd = true;
      if(this.typeFilter){
        if(element.type == this.typeValue){
          toAdd = true;
        }else{
          toAdd = false;
        }
      }

      if(toAdd){
        this.filteredConsumers.push(element);
      }
    });
  }

  resetFilter(){
    this.consumerService.getConsumers().subscribe(data => {
      this.allConsumers = data;
      this.filteredConsumers = new Array<Consumer>();
      this.allConsumers.forEach(element => {
        this.filteredConsumers.push(element);
      });
    });
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  submitConsumer(){
    var type : Type;
    if(this.addConsumerForm.controls['type'].value === '0'){
      type = Type.Residential;
    }else{
      type = Type.Commercial;
    }
    
    var address : Address;
    address = new Address(1,"",1,"",1,1);

    this.allAddresses.forEach(element => {
      if(element.addressID == this.addConsumerForm.controls['address'].value){
        address = element;
      }
    });

    var consumer = new Consumer(this.addConsumerForm.controls['name'].value, this.addConsumerForm.controls['lastName'].value, address, Number(this.addConsumerForm.controls['phoneNumber'].value), type);

    this.consumerService.postConsumer(consumer).subscribe();

    this.allConsumers.push(consumer);
    this.filteredConsumers = new Array<Consumer>();

    this.allConsumers.forEach(element => {
      this.filteredConsumers.push(element);
    });

    this.modalService.dismissAll();
    this.addConsumerForm.reset();
  }

  get id(){
    return this.addConsumerForm.get('id');
  }

  get name(){
    return this.addConsumerForm.get('name');
  }

  get lastName(){
    return this.addConsumerForm.get('lastName');
  }

  get address(){
    return this.addConsumerForm.get('address');
  }

  get phoneNumber(){
    return this.addConsumerForm.get('phoneNumber');
  }

  get type(){
    return this.addConsumerForm.get('type');
  }

  openAddConsumerModal(content : any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
