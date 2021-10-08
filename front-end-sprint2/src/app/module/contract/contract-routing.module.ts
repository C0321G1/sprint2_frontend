import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateContractComponent} from './create-contract/create-contract.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateContractComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
