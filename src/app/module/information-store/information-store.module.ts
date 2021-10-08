import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationStoreRoutingModule } from './information-store-routing.module';
import { StoreContentComponent } from './store-layout/store-content/store-content.component';
import { StorePageComponent } from './store-layout/store-page/store-page.component';
import { HistoryStoreComponent } from './store-manager/history-store/history-store.component';
import {RouterModule} from '@angular/router';
import { ListTenContractComponent } from './store-manager/list-ten-contract/list-ten-contract.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [StoreContentComponent, StorePageComponent, HistoryStoreComponent, ListTenContractComponent],
  exports: [
    StorePageComponent
  ],
    imports: [
        CommonModule,
        InformationStoreRoutingModule,
        RouterModule,
        ReactiveFormsModule,
    ]
})
export class InformationStoreModule { }
