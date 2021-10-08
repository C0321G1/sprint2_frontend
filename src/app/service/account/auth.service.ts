import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const AUTH_API = 'http://localhost:8080/api/auth/';
const ACCOUNT_API = 'http://localhost:8080/account/setPass';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
  }
  // creator: Khue

  login(user: any) {
    return this.http.post<any>(AUTH_API + 'signin', user, httpOptions);
  }

  // creator: Khue

  changPassWord(username: string, newPassWord: string){
    return this.http.get<any>(ACCOUNT_API + '?username=' + username + '&&newPassword=' + newPassWord);
  }

  // creator: Khue

  logout() {
    return this.http.patch<any>(AUTH_API + 'singout', httpOptions);
  }
}
