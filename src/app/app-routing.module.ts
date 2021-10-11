import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessageComponent} from './message/message/message.component';
import {HomeComponent} from './module/layout/home/home.component';
import {EditInformationEmployeeComponent} from './module/employee/edit-information-employee/edit-information-employee.component';

const routes: Routes = [
  {path: 'message', component: MessageComponent},
  {path: '', component: HomeComponent},
  {
    path: 'news',
    loadChildren: () => import('./module/news/news.module').then(module => module.NewsModule)
  },
  {path: 'information', component: EditInformationEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
