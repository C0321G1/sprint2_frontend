import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { ChooseCustomerComponent } from './choose-customer/choose-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {ContractRoutingModule} from './contract-routing.module';



@NgModule({
  declarations: [CreateContractComponent, ChooseCustomerComponent],
  exports: [CreateContractComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    RouterModule,
    ContractRoutingModule
  ],
  entryComponents: [ChooseCustomerComponent],
})
export class ContractModule { }
