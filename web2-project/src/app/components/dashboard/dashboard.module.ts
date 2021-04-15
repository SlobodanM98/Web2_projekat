import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports:[
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
