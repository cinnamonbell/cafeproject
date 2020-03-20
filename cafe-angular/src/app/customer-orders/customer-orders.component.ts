import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/user';
import { LoginService } from 'src/app/login.service';
import { Customer } from 'src/app/customer';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order';
import { ReviewService } from 'src/app/review.service';
import { Review } from 'src/app/review';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CustOrderCommentComponent } from 'src/app/cust-order-comment/cust-order-comment.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})

export class CustomerOrdersComponent implements OnInit {


  public user: User = new User();
  public cust: Customer = new Customer();

  public ordersList: Order[];

  constructor(public matDialog: MatDialog, public loginService: LoginService, private orderService: OrderService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.viewCustOrders();
  }

  viewCustOrders() {
    this.loginService.getLoggedInUser().subscribe(user => {
      this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null; this.orderService.getCustOrders(this.cust).subscribe(
        (resp: Array<Order>) => {
          this.ordersList = resp;
          for (let i = 0; i < this.ordersList.length; i++) {
            if (this.ordersList[i].review == null) {
              let review: Review = new Review();
              review.id = 0;
              this.ordersList[i].review = review;
            }
          }
        });
    });

  }

  commentOrder(order: Order) {
    console.log(order.id);
    console.log(order);

    let dialogRef = this.matDialog.open(CustOrderCommentComponent, {
      data: order, minHeight: '20em', width: '30%'
    });


  }

  rateGood(order: Order) {
    console.log('good rating');
    console.log(order.id);
    console.log(order);
    if (order.review !== null) {
      order.review.goodRating = true;
    }
    this.reviewService.goodRating(order).subscribe((resp: Array<Order>) => { this.viewCustOrders() });
    //this.viewCustOrders();

  }

  rateBad(order: Order) {
    console.log('bad rating');
    console.log(order.id);
    console.log(order);
    if (order.review !== null) {
      order.review.goodRating = false;
    }
    this.reviewService.badRating(order).subscribe((resp: Array<Order>) => { this.viewCustOrders() });
    //this.viewCustOrders();
  }

  sendComment(message: String, order: Order) {

  }

}
