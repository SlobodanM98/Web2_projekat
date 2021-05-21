import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Consumer, Type } from 'src/app/model/consumer';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css']
})
export class ConsumersComponent implements OnInit {

  allConsumers: Array<Consumer>;
  filteredConsumers: Array<Consumer>;

  typeFilter: boolean;

  typeValue: Type;

  addConsumerForm: FormGroup;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.allConsumers = new Array<Consumer>();
    this.filteredConsumers = new Array<Consumer>();
    this.allConsumers.push(new Consumer("Marko", "Marković", "Kralja Milana 5", 38164123, 101, Type.Commercial));
    this.allConsumers.push(new Consumer("Nikola", "Nikolić", "Kralja Aleksandra 33", 38164124, 102, Type.Residential));
    this.allConsumers.push(new Consumer("Darko", "Petrović", "Laze Lazarević 2", 38164234, 103, Type.Residential));
    this.allConsumers.push(new Consumer("Jovan", "Jovanović", "Nate Jeličić 14", 38163223, 104, Type.Commercial));
    this.allConsumers.push(new Consumer("Janko", "Veselinović", "Kneza Ive 6", 38161823, 105, Type.Residential));

    
    this.allConsumers.forEach(element => {
      this.filteredConsumers.push(element);
    });

    this.typeFilter = false;

    this.addConsumerForm = this.formBuilder.group({
      id: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      location: ['', [
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
    this.filteredConsumers = new Array<Consumer>();
    this.allConsumers.forEach(element => {
      this.filteredConsumers.push(element);
    });
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }

  submitConsumer(){
    console.log("submit")
    var type : Type;
    if(this.addConsumerForm.controls['type'].value === '0'){
      type = Type.Residential;
    }else{
      type = Type.Commercial;
    }
    
    var component = new Consumer(this.addConsumerForm.controls['name'].value, this.addConsumerForm.controls['lastName'].value, this.addConsumerForm.controls['location'].value, this.addConsumerForm.controls['phoneNumber'].value, this.addConsumerForm.controls['id'].value, type);
    
    this.allConsumers.push(component);
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

  get location(){
    return this.addConsumerForm.get('location');
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
