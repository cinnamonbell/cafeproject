import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import {ViewRewardsService} from '../view-rewards.service';

@Component({
  selector: 'app-view-rewards',
  templateUrl: './view-rewards.component.html',
  styleUrls: ['./view-rewards.component.css']
})
export class ViewRewardsComponent implements OnInit {

  public cust: Customer;
  constructor(private viewRewardsService: ViewRewardsService ) { 
    this.cust = viewRewardsService.getCustRewards();
  }

  ngOnInit(): void {
  }

}
