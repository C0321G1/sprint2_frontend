import {Injectable} from '@angular/core';

const API_URL = 'http://localhost:8080';
const API_STATUS_CONTRACT = 'http://localhost:8080/statusContract';
const API_TYPE_CONTRACT = 'http://localhost:8080/typeContract';
const API_TYPE_PRODUCT = 'http://localhost:8080/typeProduct';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../../model/contract/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  deleteContractById(id: number): Observable<Contract> {
    console.log(`${API_URL}/contract/delete/${id}`);
    return this.http.delete<Contract>(`${API_URL}/contract/delete/${id}`);
  }

  findById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${API_URL}/contract/${id}`);
  }

  getAllContract(page: number): Observable<any> {
    return this.http.get<any>(API_URL + '/contract/list' + '?page=' + page);
  }

  searchContract(page: number, customer: string,
                 startDateFrom: string, startDateTo: string, productName: string,
                 typeContract: string, statusContract: string): Observable<any> {

    console.log(' day la ngay ket thuc' + startDateTo);
    console.log(' day la ngay bat dau:' + startDateFrom);

    if (customer === undefined || customer == null) {
      customer = '';
      console.log('day la customer' + customer);
    }
    if (statusContract === undefined || statusContract == null) {
      statusContract = '';
    }
    if (typeContract === undefined || typeContract == null) {
      typeContract = '';
    }
    if (productName === undefined || productName == null) {
      productName = '';
    }
    if (startDateFrom === undefined || startDateFrom == null) {
      startDateFrom = '';
    }
    if (startDateTo === undefined || startDateTo == null) {
      startDateTo = '';
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(API_URL + '/contract/search' + '?page=' + page + '&customer=' + customer + '&statusContract=' + statusContract + '&typeContract=' + typeContract + '&productName=' + productName + '&startDateFrom=' + startDateFrom + '&startDateTo=' + startDateTo);
  }

  getAllStatusContract(): Observable<any> {
    return this.http.get<any>(API_STATUS_CONTRACT, this.httpOptions);
  }

  getAllTypeProduct(): Observable<any> {
    return this.http.get<any>(API_TYPE_PRODUCT, this.httpOptions);
  }

  getAllTypeContract(): Observable<any> {
    return this.http.get<any>(API_TYPE_CONTRACT, this.httpOptions);
  }

  searchNameStatus(name: string, status: string): Observable<any> {
    if (name === undefined){
      name = '';
    }
    if (status === undefined){
      status = '';
    }
    return this.http.get(API_URL + '/contract/searchName?name=' + name + '&status=' + status );
  }

  getAll10Contract(): Observable<any> {
    return this.http.get<any>(API_URL + '/contract/list10');

  }

  update(id: number, contract: Contract): Observable<any> {
    return this.http.patch<any>(`${API_URL}/contract/${id}`, contract);
  }
}
