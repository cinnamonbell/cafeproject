import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private url:UrlService) { }

  getPendingOrders(): Observable<Array<Order>>{
    let orderArray:Array<Order> = [];
    return this.http.get<Order[]>(this.url.getPendingOrdersUrl(), {headers: this.url.getHeader()}).pipe();
  }
}
