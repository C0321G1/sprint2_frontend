import { Component, OnInit , ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-statistic-expected',
  templateUrl: './statistic-expected.component.html',
  styleUrls: ['./statistic-expected.component.css']
})
export class StatisticExpectedComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  check = false;
  isCheck = 'check';

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.check);
    console.log(this.isCheck);
  }

  checkStatistic() {
    this.check = false;
  }

  statisticExpected() {
    this.check = true;
    this.chartOptions = {
      series: [
        {
          name: 'Tổng tiền cho vay',
          type: 'column',
          data: [1123, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: 'Tiền lãi dự kiến',
          type: 'area',
          data: [144, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        'HD-0001',
        'HD-0002',
        'HD-0003',
        'HD-0004',
        'HD-0005',
        'HD-0006',
        'HD-0007',
        'HD-0008',
        'HD-0009',
        'HD-0010',
        'HD-0011'
      ],
      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: 'VND'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + 'VND';
            }
            return y;
          }
        }
      }
    };
  }

  public generateData(count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = 'w' + (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x,
        y
      });
      i++;
    }
    return series;
  }

}
