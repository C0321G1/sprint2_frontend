import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageAndPawnRegistrationComponent} from './module/pawn-registration/homepage-and-pawn-registration/homepage-and-pawn-registration.component';

const routes: Routes = [
  {path: '', component: HomepageAndPawnRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
