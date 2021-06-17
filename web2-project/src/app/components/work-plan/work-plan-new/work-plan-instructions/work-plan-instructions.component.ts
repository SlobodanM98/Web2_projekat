import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/model/device';
import { InstructionStatus, WorkInstruction } from 'src/app/model/work-instruction';

interface TableElement{
  ID: number;
  DeviceName: string;
  Status: string;
}

@Component({
  selector: 'app-work-plan-instructions',
  templateUrl: './work-plan-instructions.component.html',
  styleUrls: ['./work-plan-instructions.component.css']
})
export class WorkPlanInstructionsComponent implements OnInit {
  
  allDevices: Array<Device>;
  workPlanInstructions: Array<WorkInstruction>;
  submitInstructionForm: FormGroup;

  displayedColumns: string[] = ['ID', 'DeviceName', 'Status'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allDevices = new Array<Device>();
    this.workPlanInstructions = new Array<WorkInstruction>();

    this.submitInstructionForm = this.fb.group({
      device: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    })

    this.loadDevices();
  }

  loadDevices(){
    var tableElements = new Array<TableElement>();
    this.workPlanInstructions.forEach(element => {
      var data : TableElement = {ID: element.instructionID, DeviceName: element.device.name, Status: InstructionStatus[element.status].toString()};
      tableElements.push(data);
    });
    this.dataSource = new MatTableDataSource(tableElements);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  submitInstruction(){
    alert("Submited.");

    this.submitInstructionForm.controls['device'].reset;
    this.submitInstructionForm.controls['description'].reset;
  }

}
