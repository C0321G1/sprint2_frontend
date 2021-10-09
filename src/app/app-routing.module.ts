import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessageComponent} from './message/message/message.component';
import {HomeComponent} from './module/layout/home/home.component';

const routes: Routes = [
  {path: 'message', component: MessageComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
