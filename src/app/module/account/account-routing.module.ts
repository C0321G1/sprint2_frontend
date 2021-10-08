import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/changPassword/:username', component: ChangePasswordComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AccountRoutingModule {
}
