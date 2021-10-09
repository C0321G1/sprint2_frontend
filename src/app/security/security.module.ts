import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
