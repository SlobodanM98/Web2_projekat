import { AfterViewInit, Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Consumer, Type } from 'src/app/model/consumer';

export interface TableElement{
  id: number;
  name: string;
  lastName: string;
  location: string;
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

  displayedColumns: string[] = ['id', 'name', 'lastName', 'location', 'phoneNumber', 'type', 'actions'];
  dataSource: any;
  tableElements: Array<TableElement>;

  editConsumerForm: FormGroup;
  deleteConsumer: Consumer;
  consumerForEdit: Consumer;

  constructor(private formBuilder : FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editConsumerForm = this.formBuilder.group({
      id: ['', [
      ]],
      name: ['', [
      ]],
      lastName: ['', [
      ]],
      location: ['', [
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
      var data : TableElement = {id: element.id, name: element.name, lastName: element.lastName, location: element.location, phoneNumber: element.phoneNumber, type: Type[element.type].toString()};
      this.tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  edit(element: Consumer, content: any){
    this.consumerForEdit = element;
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit'});
  }

  delete(element: Consumer, contentDelete: any){
    this.deleteConsumer = element;
    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-delete'});
  }

  submitEdit(){
    this.modalService.dismissAll();
    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].id === this.consumerForEdit.id){
        if(this.editConsumerForm.controls['id'].value){
          this.tableElements[i].id = this.editConsumerForm.controls['id'].value;
        }
        if(this.editConsumerForm.controls['name'].value){
          this.tableElements[i].name = this.editConsumerForm.controls['name'].value;
        }
        if(this.editConsumerForm.controls['lastName'].value){
          this.tableElements[i].lastName = this.editConsumerForm.controls['lastName'].value;
        }
        if(this.editConsumerForm.controls['location'].value){
          this.tableElements[i].location = this.editConsumerForm.controls['location'].value;
        }
        if(this.editConsumerForm.controls['phoneNumber'].value){
          this.tableElements[i].phoneNumber = this.editConsumerForm.controls['phoneNumber'].value;
        }
        if(this.editConsumerForm.controls['type'].value){
          this.tableElements[i].type = this.editConsumerForm.controls['type'].value;
        }
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.editConsumerForm.reset();
  }

  confirmDelete(){
    this.modalService.dismissAll();
    for(var i = 0; i < this.tableElements.length; i++){
      if(this.tableElements[i].id === this.deleteConsumer.id){
        this.tableElements.splice(i, 1);
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}