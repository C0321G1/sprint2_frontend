import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomerService} from '../../../service/customer/customer.service';
import {Customer} from '../../../model/customer/customer';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-choose-customer',
  templateUrl: './choose-customer.component.html',
  styleUrls: ['./choose-customer.component.css']
})
export class ChooseCustomerComponent implements OnInit {

  customerList: Customer[];
  totalPage = 0;
  page: number;

  constructor(public dialogRef: MatDialogRef<ChooseCustomerComponent>,
              private customerService: CustomerService,
              private toasts: ToastrService) { }

  ngOnInit(): void {
    this.getCustomerList(this.page);
  }

  getCustomerList(page: number) {
    this.customerService.getCustomerList(page).subscribe(data => {
      this.customerList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
      this.toasts.info('Không có thông tin khách hàng', 'Thông báo');
    });
  }

  closeChooseCustomer() {
    this.dialogRef.close();
  }

  chooseCustomer(customer: Customer) {
    this.dialogRef.close(customer);
  }

  searchCustomer(page: number, value: string) {
    this.customerService.searchToCreateContract(page, value).subscribe(data => {
      this.customerList = data.content;
      this.totalPage = data.totalPages;
    }, error => {
      this.toasts.info('Không có thông tin khách hàng', 'Thông báo');
    });
  }
}
