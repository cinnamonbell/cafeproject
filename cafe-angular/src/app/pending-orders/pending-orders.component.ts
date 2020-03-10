import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})

//component for employee user to see and respond to pending orders
export class PendingOrdersComponent implements OnInit {

  public ordersList: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

}
