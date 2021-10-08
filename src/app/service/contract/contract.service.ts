import {Injectable} from '@angular/core';

const API_URL = 'http://localhost:8080';
const API_STATUS_CONTRACT = 'http://localhost:8080/statusContract';
const API_TYPE_CONTRACT = 'http://localhost:8080/typeContract';
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

  searchContract(page: number, customer: string, startDateForm: string, startDateTo: string,
                 productName: string, statusContract: string, typeContract: string): Observable<any> {
    return this.http.get<any>(API_URL + '/search' + '?page=' + page + '&customer=' + customer + '&startDateForm=' + startDateForm + '&startDateTo=' + startDateTo
      + '&productName=' + productName + '&statusContract=' + statusContract + '&typeContract=' + typeContract);
  }

  getAllStatusContract(): Observable<any> {
    return this.http.get<any>(API_STATUS_CONTRACT, this.httpOptions);
  }
  getAllTypeContract(): Observable<any> {
    return this.http.get<any>(API_TYPE_CONTRACT, this.httpOptions);
  }
}
