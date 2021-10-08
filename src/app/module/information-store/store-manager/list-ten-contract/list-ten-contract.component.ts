import { Component, OnInit } from '@angular/core';
import {Contract} from '../../../../model/contract/contract';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ContractService} from '../../../../service/contract/contract.service';
import {DeleteContractComponent} from '../../../contract/delete-contract/delete-contract.component';
import {DetailContractComponent} from '../../../contract/detail-contract/detail-contract.component';

@Component({
  selector: 'app-list-ten-contract',
  templateUrl: './list-ten-contract.component.html',
  styleUrls: ['./list-ten-contract.component.css']
})
export class ListTenContractComponent implements OnInit {

  contract: Contract;
  contracts: Contract[] = [];
  page: number;
  listStatusContract: any;
  listTypeContract: any;
  totalPage = 0;
  flagSearch: number;
  searchForm: FormGroup;

  constructor(private dialog: MatDialog, private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.page = 0;
    this.getAllContract();
    this.getAllStatusContract();
    this.getAllTypeContract();
  }

  getAllContract() {
    this.contractService.getAllContract(this.page).subscribe(data => {
      this.contracts = data.content;
      this.totalPage = data.totalPages;
      console.log(this.totalPage);
    });
  }

  getAllStatusContract() {
    this.contractService.getAllStatusContract().subscribe(data => {
      this.listStatusContract = data;
      console.log(this.listStatusContract);
    });
  }

  getAllTypeContract() {
    this.contractService.getAllTypeContract().subscribe(data => {
      this.listTypeContract = data;
    });
  }

  // onDeleteHandler() {
  //   const dialogRef = this.dialog.open(DeleteContractComponent, {
  //     data: this.contract,
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.contractService.deleteContractById(this.contract.contractId).subscribe(data => {
  //         this.getAllContract();
  //       });
  //     }
  //   });
  // }

  searchContract() {

  }

  openDialogUpdate() {
    const dialogRef = this.dialog.open(DetailContractComponent, {
      data: this.contract,
      width: '700px'
    });
  }

  firstPage() {
    this.page = 0;
    this.getAllContract();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    if (this.flagSearch == 0) {
      this.getAllContract();
    } else {
      this.searchContract();
    }
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
      if (this.flagSearch == 0) {
        console.log(page);
        this.getAllContract();
      } else {
        this.searchContract();
      }
    } else {
      if (this.flagSearch == 0) {
        console.log(page);
        this.getAllContract();
      } else {
        this.searchContract();
      }
    }
  }

  lastPage() {
    this.page = this.totalPage - 1;
    this.getAllContract();

  }

}
