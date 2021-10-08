import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteContractComponent } from './delete-contract/delete-contract.component';
import { DetailContractComponent } from './detail-contract/detail-contract.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [DeleteContractComponent, DetailContractComponent, EditContractComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ContractModule { }
