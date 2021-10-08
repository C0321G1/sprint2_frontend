import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
import {StatisticLiquidationComponent} from './statistic-liquidation/statistic-liquidation.component';
import { StatisticInterestComponent } from './statistic-interest/statistic-interest.component';
import { StatisticExpectedComponent } from './statistic-expected/statistic-expected.component';
import {RouterModule} from '@angular/router';
import {StatisticRoutingModule} from './statistic-routing.module';

@NgModule({
  declarations: [ StatisticLiquidationComponent, StatisticInterestComponent, StatisticExpectedComponent],
  exports: [
    StatisticLiquidationComponent,
    StatisticExpectedComponent,
    StatisticInterestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    RouterModule,
    StatisticRoutingModule,
    FormsModule
  ]
})
export class StatisticModule { }
