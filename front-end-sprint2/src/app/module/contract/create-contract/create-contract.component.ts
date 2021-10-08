import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ContractService} from '../../../service/contract/contract.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TypeProduct} from '../../../model/contract/type-product';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ChooseCustomerComponent} from '../choose-customer/choose-customer.component';
import {Customer} from '../../../model/customer/customer';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  contractForm: FormGroup;
  typeProductList: TypeProduct[];
  selectedImage: any;
  positionDot = 0;
  msgImage = '';
  arrayFileExt: string[];
  msgCode = '';
  msgStartDate = '';
  msgEndDate = '';
  customerName: string;
  profitValue: number;
  selectedCustomer: Customer;
  productImage: string;
  image: string;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private contractService: ContractService,
              private matDialog: MatDialog,
              private router: Router,
              private toasts: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Tạo mới hợp đồng');
  }

  ngOnInit(): void {
    this.getTypeProductList();
    this.contractForm = new FormGroup({
      contractCode: new FormControl('', [Validators.required, Validators.pattern('^HD-\\d{4}$')]),
      customer: new FormControl(''),
      productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      typeProduct: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required, this.checkStartDate]),
      endDate: new FormControl('', [Validators.required, this.checkEndDate]),
      loan: new FormControl('', [Validators.required]),
      profit: new FormControl(''),
      productImage: new FormControl('', [Validators.required])
    });
    this.image = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';
  }

  getTypeProductList() {
    this.contractService.getTypeProductList().subscribe(data => {
      this.typeProductList = data;
    });
  }

  createContract() {
    this.contractForm.value.productImage = this.productImage;
    this.contractForm.value.profit = this.profitValue;
    this.contractForm.value.customer = this.selectedCustomer;
    this.contractService.save(this.contractForm.value).subscribe(data => {
      // @ts-ignore
      if (data.status === false) {
        // @ts-ignore
        this.msgCode = data.msgCode;
        // @ts-ignore
        this.msgStartDate = data.msgStartDate;
        // @ts-ignore
        this.msgEndDate = data.msgEndDate;
        this.toasts.error('Tạo mới hợp đồng cầm đồ thất bại, vui lòng kiểm tra lại thông tin nhập vào.', 'Thông báo');
      } else {
        this.toasts.success('Tạo mới hợp đồng cầm đồ thành công. Email thông báo đã được gửi đến khách hàng', 'Thông báo');
      }
    }, () => {
      this.toasts.error('Tạo mới hợp đồng cầm đồ thất bại, vui lòng kiểm tra lại thông tin nhập vào.', 'Thông báo');
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.checkImageFile(this.selectedImage.name);
    if (this.msgImage === '') {
      Swal.fire({
        title: 'Đang gửi dữ liệu',
        text: 'Vui lòng chờ ...',
        imageUrl: '../../../../../assets/image/spin.gif',
        imageWidth: '100px',
        showConfirmButton: false,
        allowOutsideClick: false
      });
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.productImage = url;
            this.image = url;
            Swal.close();
          });
        })
      ).subscribe();
    }
  }

  resetForm() {
    Swal.fire({
      title: 'Bạn có muốn hủy thao tác tạo mới hợp đồng cầm đồ ?',
      text: 'Hành động này không thể hoàn tác !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.ngOnInit();
        this.customerName = '';
      }
    });
  }

  checkImageFile(imageFile: string) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = imageFile.length - 1; i > 0; i--) {
      if (imageFile[i] === '.') {
        this.positionDot = i;
      }
    }
    if (this.positionDot === 0) {
      return this.msgImage = 'Ảnh không đúng định dạng, vui lòng chọn lại.';
    }
    this.arrayFileExt = ['jpg', 'png', 'jpeg', 'gif', 'raw', 'tiff', 'psd', 'eps', 'pdf', 'ai'];
    const fileExtend = imageFile.substr(this.positionDot + 1);
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.arrayFileExt.length; j++) {
      if (fileExtend === this.arrayFileExt[j]) {
        return this.msgImage = '';
      }
    }
    return this.msgImage = 'Ảnh không đúng định dạng, vui lòng chọn lại.';
  }

  get pathImage() {
    return this.contractForm.get('productImage');
  }

  openChooseCustomer() {
    // this.tempForm = this.contractForm.value;
    const dialogRef = this.matDialog.open(ChooseCustomerComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.customerName = data.name;
        this.selectedCustomer = data;
      }
    });
  }

  checkStartDate(data: AbstractControl): any {
    const startDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (startDate !== currentDate) {
      return {invalidStartDate: true};
    }
    return null;
  }

  checkEndDate(data: AbstractControl): any {
    const endDate = data.value;
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (endDate <= currentDate) {
      return {invalidEndDate: true};
    }
    return null;
  }

  calculateProfit(value1: string, value2: string) {
    const loan = Number(value1);
    const today = new Date();
    const endDate = new Date(value2);
    const numOfYear = endDate.getFullYear() - today.getFullYear();
    const numOfMonth = endDate.getMonth() - today.getMonth();
    const numOfDay = endDate.getDate() - today.getDate();

    if (numOfYear === 0) {
      if (numOfMonth === 0) {
        this.profitValue = numOfDay * loan * 0.01;
      } else {
        this.profitValue = (30 * numOfMonth + numOfDay) * loan * 0.01;
      }
    } else {
      this.profitValue = ((12 * numOfYear + numOfMonth) * 30 + numOfDay) * loan * 0.01;
    }
  }

  resetMsgCode() {
    this.msgCode = '';
  }
}
