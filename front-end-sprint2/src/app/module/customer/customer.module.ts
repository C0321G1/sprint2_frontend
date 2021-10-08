import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerRoutingModule} from './customer-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


@NgModule({
  declarations: [CreateCustomerComponent, EditCustomerComponent],
  exports: [
    CreateCustomerComponent,
  ],
  imports: [
    CustomerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
    CommonModule
  ],
})
export class CustomerModule {
}
