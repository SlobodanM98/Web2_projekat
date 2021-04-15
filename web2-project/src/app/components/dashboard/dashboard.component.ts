import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  
  public GraphChart: any;
  

  private initializeGraphChart():void {
    this.GraphChart = {
      series: [
        {
          name:"planirano",
          data:[22,78, 32, 51, 40, 102, 100]
        },

        {
          name:"neplanirano",
          data:[9, 36, 43, 11, 30, 57, 61]
        }
      ],
      title: {
        text: 'INCIDENTS',
        align: 'center',
        
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '16px',
          fontWeight:  'bold',
          fontFamily:  'Arial',
          color:  'white'
        },
      },  
      chart: {
        height: 350,
        type: "area",
        width: 400
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }


  public DonutChart: any;
  private initializeDonutChart():void
  {
    this.DonutChart = {
      series: [44, 55, 41, 17, 15],
      chartOptions: 
      {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      },
      options : {
        chart: {
          height: 300,
          type: 'donut',
          width:300
        }
      },
      title: {
        text: 'MOCKED',
        align: 'center',
        
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '16px',
          fontWeight:  'bold',
          fontFamily:  'Arial',
          color:  'white'
        },
      },
    }

  }

  constructor() { }

  ngOnInit(): void {
    
    this.initializeGraphChart();
    this.initializeDonutChart();
      


  }

}
