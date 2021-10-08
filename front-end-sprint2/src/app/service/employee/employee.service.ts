import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../model/gender/gender';
import {Employee} from '../../model/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(public httpClient: HttpClient) {
  }

// creator: HauHP
  private API_EMPLOYEE = 'http://localhost:8080/employee/create';
  private API_GENDER = 'http://localhost:8080/gender';
  private API_EMPLOYEE_FIND: 'http://localhost:8080/employee';


  save(employee): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.API_EMPLOYEE, employee);
  }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.API_GENDER);
  }

  findById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>('http://localhost:8080/employee/' + id);
  }

  update(value: any) {
    return this.httpClient.patch<any>('http://localhost:8080/employee/edit/', value);
  }
}
