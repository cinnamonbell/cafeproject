import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../order';
import { Address } from '../address';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public order: Order, public dialogRef: MatDialogRef<OrderUpdateComponent>) {
  }

  ngOnInit(): void {
  }

  closeComponent(){
    this.dialogRef.close();
  }
}
