import { Injectable } from '@angular/core';
import { Order } from './order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getPendingOrders(): Order{ 
    //implementation needed
    return new Order();
  }
}
