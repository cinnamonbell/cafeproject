import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import {ViewRewardsService} from '../view-rewards.service';
import { User } from 'src/app/user';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-view-rewards',
  templateUrl: './view-rewards.component.html',
  styleUrls: ['./view-rewards.component.css']
})
export class ViewRewardsComponent implements OnInit {
  public user:User = null;
  public cust: Customer;
  constructor(private viewRewardsService: ViewRewardsService, private loginService:LoginService ) { 
    // this.cust = viewRewardsService.getCustRewards();
    // this.user = loginService.getLoggedInUser();
    // console.log(this.user);

  }

  ngOnInit(): void {
  }


}
