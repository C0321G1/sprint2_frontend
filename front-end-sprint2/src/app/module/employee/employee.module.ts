import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';



@NgModule({
  declarations: [CreateEmployeeComponent, EditEmployeeComponent],
  exports: [
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
  ]
})
export class EmployeeModule { }
