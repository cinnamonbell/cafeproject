import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItem } from 'src/app/order-item';

@Component({
  selector: 'app-claim-reward-comment',
  templateUrl: './claim-reward-comment.component.html',
  styleUrls: ['./claim-reward-comment.component.css']
})
export class ClaimRewardCommentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public items: OrderItem[], public dialogRef: MatDialogRef<ClaimRewardCommentComponent>) { 
    console.log(this.items);
    setTimeout( ()=>this.closeComponent(), 8000);
  }

  ngOnInit(): void {
  }


  closeComponent(){
    this.dialogRef.close();
  }
}
