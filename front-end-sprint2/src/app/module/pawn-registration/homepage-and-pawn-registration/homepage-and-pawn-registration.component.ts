import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PawnRegistrationService} from '../../../service/pawn-registration/pawn-registration.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TypeProduct} from '../../../model/contract/type-product';

@Component({
  selector: 'app-homepage-and-pawn-registration',
  templateUrl: './homepage-and-pawn-registration.component.html',
  styleUrls: ['./homepage-and-pawn-registration.component.css']
})
export class HomepageAndPawnRegistrationComponent implements OnInit {
  typeProductList: TypeProduct[];
  notification: boolean;
  count = 0;

  pawnRegistrationForm = new FormGroup({
    typeProduct: new FormControl('', [Validators.required]),
    nameCustomer: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}$')]),
    address: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private pawnRegistrationService: PawnRegistrationService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.pawnRegistrationService.getAllProduct().subscribe(data => {
      this.typeProductList = data;
    });
  }

  createPawn() {
    const pawnRegister = this.pawnRegistrationForm.value;
    this.pawnRegistrationService.createPawnRegistration(pawnRegister).subscribe(() => {
      this.pawnRegistrationForm.reset();
      this.getProduct();
      this.toast.success('Đăng ký thành công. Nhân viên tư vấn sẽ liên lạc bạn để xác nhận !!!', 'Thông báo');
      this.notification = true;
      this.count ++;
    }, error => {
      this.toast.error('Đăng ký thất bại !!!', 'Thông báo');
    });
  }

  receiveNotification($event) {
    this.notification = $event;
  }

  receiveCount($event) {
    this.count = $event;
  }
}
