import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public API = 'http://localhost:8080/employee';
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
}
