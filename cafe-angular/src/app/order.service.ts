import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { MenuComponent } from './menu/menu.component';
import { LoginService } from './login.service';
import { Customer } from './customer';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public cust: Customer = null;
  public user: User;
  constructor(private http:HttpClient, private url:UrlService, private loginService:LoginService) { }

  subOrder(data:Order):Observable<any>{
    console.log(this.url.getOrderUrl());
    return this.http.post(this.url.getOrderUrl(), data, {headers: this.url.getHeader()});
  }

  getPendingOrders(): Observable<Array<Order>>{
    let orderArray:Array<Order> = [];
    return this.http.get<Order[]>(this.url.getPendingOrdersUrl(), {headers: this.url.getHeader()}).pipe();
  }
}
