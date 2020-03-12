import { Injectable } from '@angular/core';
import { Customer } from './customer';


@Injectable({
  providedIn: 'root'
})
export class ViewRewardsService {

  constructor() { }

  getCustRewards():Customer{
    let customer:Customer = new Customer();
    customer.id = 1;
    customer.first = "david";
    customer.last = "youn";
    customer.stars = 3;
    console.log(customer);


    return customer;
  }
}
