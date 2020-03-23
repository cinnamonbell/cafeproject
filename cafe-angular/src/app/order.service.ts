import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Customer } from './customer';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private url: UrlService) { }
  subOrder(data: Order): Observable<any> {
    console.log(this.url.getOrderUrl());
    return this.http.post(this.url.getOrderUrl(), data, { headers: this.url.getHeader() });
  }


  getPendingOrders(): Observable<Array<Order>> {
    let orderArray: Array<Order> = [];
    return this.http.get<Order[]>(this.url.getPendingOrdersUrl(), { headers: this.url.getHeader() }).pipe();
  }

  getCustOrders(cust: Customer): Observable<Array<Order>> {
    let custOrders: Array<Order> = [];
    console.log(cust);
    return this.http.post<Order[]>(this.url.getCustOrder(), cust, { headers: this.url.getHeader() }).pipe();
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.url.getUpdateOrderUrl(order.id), order,
      { headers: this.url.getHeader() }).pipe();
  }

  getAllOrders(): Observable<Array<Order>> {
    return this.http.get<Order[]>(this.url.getAllOrdersUrl(), { headers: this.url.getHeader() }).pipe();
  }

}
