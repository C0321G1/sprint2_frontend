import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StorePageComponent} from './store-layout/store-page/store-page.component';
import {HistoryStoreComponent} from './store-manager/history-store/history-store.component';
import {EditContractComponent} from '../contract/edit-contract/edit-contract.component';
import {ListTenContractComponent} from './store-manager/list-ten-contract/list-ten-contract.component';


const routes: Routes = [
  {
    path: '', component: StorePageComponent,
    children: [
      {path: 'history-store', component: HistoryStoreComponent},
      {path: 'edit-contract', component: EditContractComponent},
      {path: 'list-ten-contract', component: ListTenContractComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationStoreRoutingModule {
}
