import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteContractComponent} from '../../../contract/delete-contract/delete-contract.component';
import {Contract} from '../../../../model/contract/contract';
import {ContractService} from '../../../../service/contract/contract.service';
import {FormGroup} from '@angular/forms';
import {DetailContractComponent} from '../../../contract/detail-contract/detail-contract.component';

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
  }


  // onDeleteHandler() {
  //   console.log(this.contract);
  //   const dialogRef = this.dialog.open(DeleteContractComponent, {
  //     data: this.contract.contractId; this.contract.contractCode;
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.contractService.deleteContractById(this.contract.contractId).subscribe(data => {
  //         this.getAllContract();
  //       });
  //     }
  //     console.log(this.contract.contractId);
  //   });
  // }
  searchContractFrom: any;

  searchContract() {

  }

  openDialogUpdate(contract: Contract) {
    const dialogRef = this.dialog.open(DetailContractComponent, {
      data: contract,
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
          this.getAllContract();
        });
      }
    });
  }
}
