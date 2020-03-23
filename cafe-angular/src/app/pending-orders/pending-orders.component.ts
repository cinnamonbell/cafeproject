import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { MatDialog } from '@angular/material/dialog';
import { OrderUpdateComponent } from '../order-update/order-update.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})

//component for employee user to see and respond to pending orders
export class PendingOrdersComponent implements OnInit {

  public ordersList: Order[];

  constructor(private orderService: OrderService, private dialog: MatDialog) {
    orderService.getPendingOrders().subscribe((resp: Array<Order>) => {
      this.ordersList = resp;
      this.ordersList.forEach( (order, i) => {
        console.log(order);
        })
      });
  }

   getMoreInfo(order: Order){
    console.log(order);
    let dialogRef = this.dialog.open(OrderUpdateComponent, {
      data: order, minHeight: '35em', width: '60%'});
      dialogRef.afterClosed().subscribe( ({remove: removeOrder, order: newOrder}) => {
        if (removeOrder) {
          let idx = this.ordersList.indexOf(order);
          if (idx > -1) this.ordersList.splice(idx, 1);
        } else {
          let idx = this.ordersList.indexOf(order);
          if (idx > -1 && newOrder != null) this.ordersList[idx] = newOrder;
        }
      })
   }

  ngOnInit(): void {

  }

}
