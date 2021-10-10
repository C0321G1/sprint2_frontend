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
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../../model/contract/contract';
import {StatisticService} from '../../../service/statistic/statistic.service';

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
  messenger = false;
  checkStartDate = '';
  checkEndDate = '';
  checkDateForm: FormGroup;
  isCheckStatistic = false;
  contract: Contract[]=[];
  totalMoney = 0;
  constructor(private statisticService: StatisticService) {
    this.getEndDateStartDate();
  }

  ngOnInit(): void {
  }

  getEndDateStartDate() {
    this.checkDateForm = new FormGroup({
      checkStartDate: new FormControl('', Validators.required),
      checkEndDate: new FormControl('', Validators.required)
    },this.checkDate);
  }
  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('checkStartDate');
    const toDate = check.get('checkEndDate');
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  getLoan() {
    this.statisticService.getStatisticExpected(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[0].data.push(Number(this.contract[i].loan));
      }

    }, error => {
      console.log(error);
    });
  }

  getContractCode() {
    this.statisticService.getStatisticExpected(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      this.chartOptions.labels[0] =this.contract[0].contractCode;
      for (let i = 1; i < this.contract.length; i++) {
        this.totalMoney+=Number(this.contract[i].profit);
        this.chartOptions.labels.push(this.contract[i].contractCode);
      }


    }, error => {
      console.log(error);
    });
    console.log(this.totalMoney);
  }


  getProfit() {
    this.statisticService.getStatisticExpected(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[1].data.push(Number(this.contract[i].profit));
      }

    }, error => {
      console.log(error);
    });
  }

  getStatistic(){
    this.check=true;
    this.isCheckStatistic=true;
    if (this.isCheckStatistic){
      this.statisticExpected();
      this.getContractCode();
      this.getLoan();
      this.getProfit();


    }
  }

  statisticExpected() {
  if (this.checkEndDate === '' || this.checkStartDate === '') {

    } else {
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
