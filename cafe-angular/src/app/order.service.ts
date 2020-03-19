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
    return this.http.put<Order>(this.url.getUpdateOrderUrl(order.id), order, 
    {headers: this.url.getHeader() }).pipe();
  }
}
