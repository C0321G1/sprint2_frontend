import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateEmployeeComponent
  },
   {
    path: 'edit/:id',
    component: EditEmployeeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule { }
