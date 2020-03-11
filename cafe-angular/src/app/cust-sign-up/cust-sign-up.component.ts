import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cust-sign-up',
  templateUrl: './cust-sign-up.component.html',
  styleUrls: ['./cust-sign-up.component.css']
})
export class CustSignUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustSignUpComponent>) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.dialogRef.close();
  }

}
