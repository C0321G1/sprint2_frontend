import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeProduct} from '../../model/contract/type-product';
import {Observable} from 'rxjs';
import {Contract} from '../../model/contract/contract';


const API_CONTRACT = 'http://localhost:8080/contract';
const API_TYPE_PRODUCT = 'http://localhost:8080/typeProduct';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient) { }

  // Linh code
  getTypeProductList(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(API_TYPE_PRODUCT);
  }

  // Linh code
  save(contract): Observable<Contract> {
    return this.httpClient.post<Contract>(API_CONTRACT, contract);
  }
}
