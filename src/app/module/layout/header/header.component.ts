import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../service/account/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/account/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  isLogged = false;
  username: string;
  showAdminBoard = false;
  showEmployeeBoard = false;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.isLogged = this.authService.isLoggedIn;
      this.roles = user.roles;
      this.username = user.username;
    }
  }

}
