import { Injectable } from '@angular/core';
import { Order } from './order';
import { Customer } from './customer';
import { OrderItem } from './order-item';
import { MenuItem } from './menu-item';
import { Address } from './address';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private url:UrlService) { }

  getPendingOrders(): Order[]{ 
    //implementation needed
    //currently contains mock data
    let orderArray:Array<Order> = [];
    let order:Order = new Order();
    order.price = 6.78;
    order.customer = new Customer();
    order.customer.first = "Arthur";
    order.customer.last = "Dent";
    order.address = new Address();
    order.address.address = "12 Baker St";
    order.orderItems = [new OrderItem(), new OrderItem()];
    order.orderItems[0].menuItem = new MenuItem();
    order.orderItems[0].menuItem.name = "toast";
    order.orderItems[0].quantity = 2;
    order.orderItems[1].menuItem = new MenuItem();
    order.orderItems[1].menuItem.name = "baked beans";
    order.orderItems[1].quantity = 2;
    order.orderTime = new Date("2021-01-09T14:17:23");
    order.lastActionTime = new Date("2021-01-09T14:23:58");
    console.log(order);
    orderArray.push(order);
    order = new Order();
    order.price = 11.38;
    order.customer = new Customer();
    order.customer.first = "Marvin";
    order.customer.last = "Android";
    order.address = new Address();
    order.address.address = "34 High St";
    order.orderItems = [new OrderItem()];
    order.orderItems[0].menuItem = new MenuItem();
    order.orderItems[0].menuItem.name = "metal";
    order.orderItems[0].quantity = 1;
    order.orderTime = new Date("2021-01-09T14:18:59");
    order.lastActionTime = new Date("2021-01-09T14:25:01");
    console.log(order);
    orderArray.push(order);
    return orderArray;
  }

  getPendingOrdersI(): Order[]{
    let orderArray:Array<Order> = [];
    this.http.get<Order[]>(this.url.getPendingOrdersUrl()).pipe()
      .subscribe((resp: Array<Order>) => orderArray = resp);
    return orderArray;
  }
}
