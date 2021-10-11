import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteContractComponent } from './delete-contract/delete-contract.component';
import { DetailContractComponent } from './detail-contract/detail-contract.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ContractRoutingModule} from './contract-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { EditHistoryComponent } from './edit-history/edit-history.component';



@NgModule({
  declarations: [DeleteContractComponent, DetailContractComponent, EditContractComponent, EditHistoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ContractRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ]
})
export class ContractModule { }
