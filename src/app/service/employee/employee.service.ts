import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';
import {Employee} from "../../model/employee/employee";
import {Gender} from "../../model/gender/gender";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public API = 'http://localhost:8080/employee';
  private API_EMPLOYEE = 'http://localhost:8080/employee/create';
  private API_GENDER = 'http://localhost:8080/employee/gender';
  private API_EMPLOYEE_FIND: 'http://localhost:8080/employee';
  public API_INFORMATION = 'http://localhost:8080/employee/employee';

  httpOptions: any;

  constructor(public http: HttpClient, private tokenStorage: TokenStorageService ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllUser(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.API + '/listEmployee', this.httpOptions);
  }

  save(employee): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.API_EMPLOYEE, employee);
  }

  getGenderList(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.API_GENDER);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/employee/' + id);
  }

  update(value: any) {
    return this.http.patch<any>('http://localhost:8080/employee/edit/', value);
  }
  // updateEmployee(id: number, employee: Employee): Observable<HttpEvent<any>> {
  //   return this.http.patch<any>(this.API_INFORMATION + '/' + id, employee);
  // }
}
