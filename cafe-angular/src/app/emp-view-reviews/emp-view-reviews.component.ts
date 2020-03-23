import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order';
import { Review } from 'src/app/review';
import { Customer } from 'src/app/customer';
import { EmpReviews } from 'src/app/emp-reviews';

@Component({
  selector: 'app-emp-view-reviews',
  templateUrl: './emp-view-reviews.component.html',
  styleUrls: ['./emp-view-reviews.component.css']
})
export class EmpViewReviewsComponent implements OnInit {

  public ordersList: Order[];
  public custSet: Array<Customer> = new Array<Customer>();
  public uniqueCust: Array<Customer> = new Array<Customer>();
  public revArray: Array<EmpReviews> = new Array<EmpReviews>();


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    let commentArray: Array<string> = new Array<string>();
    let empReviews: EmpReviews = new EmpReviews();

    this.orderService.getAllOrders().subscribe(
      (resp: Array<Order>) => {
        this.ordersList = resp;
        for (let i = 0; i < this.ordersList.length; i++) {
          {
            if (this.ordersList[i].customer !== null) {
              this.custSet.push(this.ordersList[i].customer);
            }
          }


          console.log(this.ordersList[i]);
        }
        const uniqueArray = this.custSet.filter(
          (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
        );
        console.log('Customers:');
        this.uniqueCust = uniqueArray;
        console.log(this.uniqueCust);
        for (let j = 0; j < uniqueArray.length; j++) {
          empReviews = new EmpReviews();
          empReviews.cust = new Customer();
          empReviews.bad = 0;
          empReviews.good = 0;
          empReviews.comments = null;
          commentArray = [];

          empReviews.cust = this.uniqueCust[j];
          for (let i = 0; i < this.ordersList.length; i++) {
            if (this.ordersList[i].customer !== null && uniqueArray[j].id == this.ordersList[i].customer.id) {
              if (this.ordersList[i].review != null) {

                if (this.ordersList[i].review.goodRating != null && this.ordersList[i].review.goodRating == true) {
                  empReviews.good++;
                }
                if (this.ordersList[i].review.goodRating != null && this.ordersList[i].review.goodRating == false) {
                  empReviews.bad++;
                }
                if (this.ordersList[i].review.comments != null) {
                  commentArray.push(this.ordersList[i].review.comments);
                }
              }
            }
          }
          empReviews.comments = commentArray;
          this.revArray.push(empReviews);
        }
        console.log('the craziness');
        console.log(this.revArray);
      });


  }

  viewOrderReviews() {
    this.orderService.getAllOrders().subscribe(
      (resp: Array<Order>) => {
        this.ordersList = resp;
        for (let i = 0; i < this.ordersList.length; i++) {
          if (this.ordersList[i].review == null) {
            console.log(this.ordersList[i].status);
            let review: Review = new Review();
            review.id = 0;
            this.ordersList[i].review = review;
          }
        }
      });
  }

}
