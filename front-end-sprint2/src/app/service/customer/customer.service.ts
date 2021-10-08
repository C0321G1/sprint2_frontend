import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../model/customer/customer';


const API_CUSTOMER = 'http://localhost:8080/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  // Linh code
  getCustomerList(page: number): Observable<any> {
    return this.httpClient.get<any>(API_CUSTOMER + '?page=' + page);
  }

  // Linh code
  findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(API_CUSTOMER + '/' + id);
  }

  // Linh code
  searchToCreateContract(page: number, keyword: string): Observable<any> {
    return this.httpClient.get<any>(API_CUSTOMER + '/searchToCreateContract' + '?page=' + page + '&keyword=' + keyword);
  }
}
