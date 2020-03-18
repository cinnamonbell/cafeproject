import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../order';
import { OrderStatus } from '../order-status.enum';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  public nextStage:OrderStatus;
  public comStatus = "\n";
  public badAction:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public order: Order, public dialogRef: MatDialogRef<OrderUpdateComponent>,
    private orderService: OrderService) {
  }

  ngOnInit(): void {
    switch (this.order.status){
      case OrderStatus.Pending:
        this.nextStage = OrderStatus.Ready;
        break;
      case OrderStatus.Ready:
        this.nextStage = OrderStatus.Completed;
        break;
      default:
        this.nextStage = OrderStatus.Completed;
        break;
    }
  }

  closeComponent(){
    this.dialogRef.close();
  }

  updateOrder(){
    this.comStatus = "Updating order status ...";
    this.order.status = this.nextStage;
    this.orderService.updateOrder(this.order).subscribe( (resp: Order) => {
      if (resp == null) {
        this.badAction = true;
        this.comStatus = "Failed to update order.";
      } else {
        this.badAction = false;
        this.comStatus = "Successfully updated order.";
        setTimeout( ()=>this.closeComponent(), 2500);
      }
    });
  }
}
