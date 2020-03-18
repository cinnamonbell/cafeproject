import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { Customer } from 'src/app/customer';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getPendingOrders(): Observable<Array<Order>> {
    let orderArray: Array<Order> = [];
    return this.http.get<Order[]>(this.url.getPendingOrdersUrl(), { headers: this.url.getHeader() }).pipe();
  }

  getCustOrders(cust: Customer): Observable<Array<Order>> {
    let custOrders: Array<Order> = [];
    console.log(cust);
    return this.http.post<Order[]>(this.url.getCustOrder(), cust, { headers: this.url.getHeader() }).pipe();
  }

  updateOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(this.url.getUpdateOrderUrl(order.id), 
    {headers: this.url.getHeader}).pipe();
  }
}
