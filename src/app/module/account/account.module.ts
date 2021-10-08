import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountRoutingModule} from './account-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
