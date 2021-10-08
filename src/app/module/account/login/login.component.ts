import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/account/auth.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../service/account/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkLogin = false;
  form;

  constructor(private fb: FormBuilder,
              private myRoute: Router,
              private auth: AuthService,
              private tokenStorage: TokenStorageService,
              private toast: ToastrService) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.maxLength(18)]],
      password: ['', Validators.required],
      remember: ['']
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(
        data => {
          if (this.form.value.remember){
            this.tokenStorage.saveTokenLocal(data.accessToken);
            this.tokenStorage.saveUserLocal(data);
          }else {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
          }
          this.auth.isLoggedIn = true;
          const time: string = this.tokenStorage.getUser().userTime;
          const curentTime: string = new Date().toISOString().slice(0, 10);
          this.toast.success('đăng nhập thành công', 'thông báo');
          // @ts-ignore
          if (30 < (new Date(curentTime) - new Date(time)) / (1000 * 60 * 60 * 24)){
            this.myRoute.navigate(['login/changPassword/' + this.tokenStorage.getUser().username]);
          }
          this.reloadPage();
        },
        err => {
          this.toast.error('đăng nhập thất bại', 'thông báo');
          this.auth.isLoggedIn = false;
          this.checkLogin = true;
        }
      );
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
