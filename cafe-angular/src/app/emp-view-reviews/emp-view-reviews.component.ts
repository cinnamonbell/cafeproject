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



  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    let revArray: Array<EmpReviews> = new Array<EmpReviews>();
    let commentArray: Array<string> = new Array<string>();
    this.orderService.getAllOrders().subscribe(
      (resp: Array<Order>) => {
        this.ordersList = resp;
        for (let i = 0; i < this.ordersList.length; i++) {
          {
            this.custSet.push(this.ordersList[i].customer);
          }


          console.log(this.ordersList[i]);
        }
        const uniqueArray = this.custSet.filter(
          (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
        );
        console.log('Customers:');
        console.log(uniqueArray);
        for (let j = 0; j < uniqueArray.length; j++) {
          let empReviews: EmpReviews = new EmpReviews();
          for (let i = 0; i < this.ordersList.length; i++) {
            if (uniqueArray[j].id == this.ordersList[i].customer.id) {
              empReviews.id = j;
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
          empReviews.comments = commentArray;
          revArray.push(empReviews);
        }
      });
    console.log('the craziness');
    console.log(revArray);

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
