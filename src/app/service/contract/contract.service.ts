import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract} from '../../model/contract/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  API_URL = 'http://localhost:8080/contract';

  constructor(private httpClient: HttpClient) {
  }

  getListContract(page: number) {
    return this.httpClient.get(this.API_URL + '/list' + '?page=' + page);
  }

  searchContract(code: string, name: string, product: string, date: string, page: number) {
    return this.httpClient.get(this.API_URL + '/search/' + code + ',' + name + ',' + product + ',' + date + '?page=' + page);
  }

  paymentContract(contract: Contract) {
    return this.httpClient.post(this.API_URL + '/payment', contract);
  }
}
