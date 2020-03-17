import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { LoginService } from 'src/app/login.service';
import { Customer } from 'src/app/customer';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  public user:User = new User();
  public cust:Customer = new Customer();

  constructor(public loginService:LoginService, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  viewCustOrders(){
    this.loginService.getLoggedInUser().subscribe(user => {this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null;});
    console.log(this.cust);
    this.orderService.getCustOrders(this.cust).subscribe();
  }

}
