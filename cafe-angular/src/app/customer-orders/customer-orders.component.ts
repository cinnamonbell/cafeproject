import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { LoginService } from 'src/app/login.service';
import { Customer } from 'src/app/customer';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order';
import { ReviewService } from 'src/app/review.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  public user: User = new User();
  public cust: Customer = new Customer();
  public ordersList: Order[];

  constructor(public loginService: LoginService, private orderService: OrderService, private reviewService:ReviewService) { }

  ngOnInit(): void {
  }

  viewCustOrders() {
    this.loginService.getLoggedInUser().subscribe(user => { this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null; });
    console.log(this.cust);
    this.orderService.getCustOrders(this.cust).subscribe((resp: Array<Order>) => {
      this.ordersList = resp;
      this.ordersList.forEach((order, i) => {
        console.log('customer orders: ');
        console.log(order);
      })
    });
  }

  commentOrder(order:Order){
    console.log(order.id);
    this.reviewService.comment(order).subscribe();

  }

  rateGood(order:Order){
    console.log('good rating');
    console.log(order.id);
    this.reviewService.goodRating(order).subscribe();

  }
  
  rateBad(order:Order){
    console.log('bad rating');
    console.log(order.id);
    this.reviewService.badRating(order).subscribe();
  }

}
