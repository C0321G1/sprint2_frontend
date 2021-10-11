import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteContractComponent} from '../../../contract/delete-contract/delete-contract.component';
import {Contract} from '../../../../model/contract/contract';
import {ContractService} from '../../../../service/contract/contract.service';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {DetailContractComponent} from '../../../contract/detail-contract/detail-contract.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-history-store',
  templateUrl: './history-store.component.html',
  styleUrls: ['./history-store.component.css']
})
export class HistoryStoreComponent implements OnInit {
  contract: Contract;
  contracts: Contract[] = [];
  page: number;
  listStatusContract: any;
  listTypeContract: any;
  totalPage = 0;
  flagSearch: number;
  searchContractFrom: FormGroup;
  customer: any;
  statusSearch: any;
  typeSearch: any;
  startDateForm: any;
  startDateTo: any;
  productName: any;
  search: any;
  typeContract: any;
  statusContract: any;

  constructor(private dialog: MatDialog,
              private toasts: ToastrService,
              private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.page = 0;
    this.getAllListContract();
    this.getAllStatusContract();
    this.getAllTypeContract();
    this.searchContractFrom = new FormGroup({
      customer: new FormControl(),
      startDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      startDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      productName: new FormControl(),
      typeContract: new FormControl(),
      statusContract: new FormControl(),
    });
  }

  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('startDateFrom');
    const toDate = check.get('startUsedDateTo');
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  private checkDateFrom(check: AbstractControl) {
    const fromDate = new Date(check.value);
    const nowDate = new Date();
    return fromDate < nowDate ? null : {errorDateFromNow: true};
  }

  private checkDateTo(check: AbstractControl) {
    const toDate = new Date(check.value);
    const nowDate = new Date();
    return toDate < nowDate ? null : {errorDateToNow: true};
  }


  getAllListContract() {
    this.contractService.getAllContract(this.page).subscribe(data => {
      this.contracts = data.content;
      this.totalPage = data.totalPages;
      console.log(this.contracts);
    });
  }

  getAllStatusContract() {
    this.contractService.getAllStatusContract().subscribe(data => {
      this.listStatusContract = data;
    });
  }

  getAllTypeContract() {
    this.contractService.getAllTypeContract().subscribe(data => {
      this.listTypeContract = data;
    });
    console.log(this.listTypeContract);
  }


  searchPageContract(page: number) {
    const dateFrom = new Date(this.startDateForm);
    const mesDate = new Date();
    if (dateFrom > new Date()) {
      this.toasts.error('Input Start date from < ' + mesDate + ' please.');
      return;
    }
    const dateTo = new Date(this.startDateTo);
    if (dateTo > new Date()) {
      this.toasts.error('Input Start date to < ' + mesDate + ' please.');
      return;
    }
    this.contractService.searchContract(page, this.searchContractFrom.value.customer,
      this.searchContractFrom.value.startDateFrom, this.searchContractFrom.value.startDateTo,
      this.searchContractFrom.value.productName, this.searchContractFrom.value.typeContract,
      this.searchContractFrom.value.statusContract).subscribe(value => {
      this.contracts = value.content;
      this.totalPage = value.totalPages;
      this.flagSearch = 1;
      console.log('day la search' + JSON.stringify(this.contracts));
    }, error => {
      if (error.status === 404) {
       this.flagSearch = 0;
      }
    });
  }

  openDialogDetail(contract: Contract) {
    const dialogRef = this.dialog.open(DetailContractComponent, {
      data: contract,
      width: '700px'
    });
  }
  setPage() {
    if (this.flagSearch === 0) {
      this.page = 0;
    }
  }

  goPreviousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    if (this.flagSearch === 0) {
      this.getAllListContract();
    } else {
      this.searchPageContract(this.page);
    }
  }

  goNextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    if (this.flagSearch === 0) {
      this.getAllListContract();
    } else {
      this.searchPageContract(this.page);
    }
  }

  goPage(value: string) {
    const searchPage = Number(value) - 1;
    if (searchPage < this.totalPage && searchPage >= 0) {
      if (this.flagSearch === 0) {
        this.getAllListContract();
      } else {
        this.searchPageContract(searchPage);
      }
    } else {
      if (value === '') {
        this.toasts.warning('Vui lòng nhập số trang', 'Thông báo');
      } else {
        this.toasts.warning('Vui lòng nhập đúng số trang', 'Thông báo');
      }
    }
  }


  getContract(c: Contract) {
    this.contract = c;
  }

  onDeleteContract(contractCode: string, name: string, contractId: number) {

    const dialogRef = this.dialog.open(DeleteContractComponent, {
      width: '500px',
      data: {
        nameCustomer: name,
        nameContractCode: contractCode,
        idContract: contractId
      }
    });
    console.log('day la contractId ' + contractId);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractService.deleteContractById(contractId).subscribe(data => {
          this.getAllListContract();
        });
      }
    });
  }

  resetForm() {
    this.searchContractFrom = new FormGroup({
      customer: new FormControl(),
      startDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      startDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      productName: new FormControl(),
      typeContract: new FormControl(),
      statusContract: new FormControl(),
    });
    this.customer = '';
    this.startDateForm = '';
    this.startDateTo = '';
    this.productName = '';
    this.typeContract = '';
    this.statusContract = '';
    this.getAllListContract();
    this.flagSearch = 1;
  }
}
