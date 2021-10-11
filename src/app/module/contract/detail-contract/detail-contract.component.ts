import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.css']
})
export class DetailContractComponent implements OnInit {

  constructor(public  dialogRef: MatDialogRef<DetailContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  checkLiquidation() {
    if (this.data.statusContract.name === 'Đang chờ thanh lý') {
      document.getElementById('show').style.display = 'block';
    }
  }

}
