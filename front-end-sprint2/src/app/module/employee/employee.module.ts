import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditInformationEmployeeComponent} from "./edit-information-employee/edit-information-employee.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {EmployeeRoutingModule} from "./employee-routing.module";



@NgModule({
  declarations: [EditInformationEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
