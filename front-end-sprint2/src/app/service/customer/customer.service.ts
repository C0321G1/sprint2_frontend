import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../model/customer/Customer';
import {Gender} from '../../model/gender/gender';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_URL_CUSTOMER = "http://localhost:8080/customer";
  private API_URL_GENDER = "http://localhost:8080/gender";


  constructor(private httpClient: HttpClient) { }

  getAllGender() {
    return this.httpClient.get<Gender[]>(this.API_URL_GENDER);
  }

  saveCustomer(customer){
    return this.httpClient.post<Customer>(this.API_URL_CUSTOMER, customer);
  }

  editCustomer(customer){
    return this.httpClient.patch<Customer>(this.API_URL_CUSTOMER, customer);
  }

  findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.API_URL_CUSTOMER + '/' + id);
  }
}
