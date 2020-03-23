import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  public comStatus = "\n";
  public badAction:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public order: Order,
  public dialogRef: MatDialogRef<ConfirmOrderComponent>,
  private orderService: OrderService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.closeComponent(null);
  }

  closeComponent(order: Order){
    this.dialogRef.close(order);
  }

  addOrder(){
    this.comStatus = "Submitting order ...";
    this.orderService.subOrder(this.order).subscribe( (resp: Order) => {
      if (resp == null) {
        this.badAction = true;
        this.comStatus = "An error occurred while trying to submit your order.";
      } else {
        this.badAction = false;
        this.comStatus = "Successfully submitted order!";
        this.order = resp;
        setTimeout( ()=>this.closeComponent(this.order), 2500);
      }
    });
  }
}
