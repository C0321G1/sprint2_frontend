import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../service/account/auth.service';
import {TokenStorageService} from '../../service/account/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.tokenStorageService.getUser();


    if (currentUser !== null) {
      if (currentUser.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        this.router.navigate([''], {queryParams: {returnUrl: state.url}});
        this.toastr.success('Thông báo!', 'Bạn không thể truy cập vào trong này!');
        return false;
      }
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
