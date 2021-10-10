import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
private API = 'http://localhost:8080';

  constructor(public httpClient: HttpClient ) {}


  getStatisticInterest(startDate: String,endDate: String):Observable<any>{
    return this.httpClient.get<any>(this.API + '/statisticInterest?startDate='+startDate + '&endDate='+endDate)
  }
  getStatisticExpected(startDate: String,endDate: String):Observable<any>{
    return this.httpClient.get<any>(this.API + '/statisticExpected?startDate='+startDate + '&endDate='+endDate)
  }
  getStatisticLiquidation(startDate: String,endDate: String):Observable<any>{
    return this.httpClient.get<any>(this.API + '/statisticLiquidation?startDate='+startDate + '&endDate='+endDate)
  }
}
