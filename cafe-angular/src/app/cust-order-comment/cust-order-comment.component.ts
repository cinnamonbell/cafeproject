import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/order';
import { ReviewService } from 'src/app/review.service';
import { CustomerOrdersComponent } from 'src/app/customer-orders/customer-orders.component';

@Component({
  selector: 'app-cust-order-comment',
  templateUrl: './cust-order-comment.component.html',
  styleUrls: ['./cust-order-comment.component.css'],
  
 
})

export class CustOrderCommentComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public order: Order,public dialogRef: MatDialogRef<CustOrderCommentComponent>,  private reviewService: ReviewService) { }

  ngOnInit(): void {
  }


  sendMessage(data){
    console.log('working on it');
    console.log(this.order);
    console.log(data.comment);
    if (this.order.review !== null) {
      this.order.review.comments = data.comment;
    }
    this.reviewService.comment(this.order).subscribe((resp: Array<Order>) => {  window.location.reload();});
    
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
