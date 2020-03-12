import { Component, OnInit } from '@angular/core';
import { CustSignUpComponent } from 'src/app/cust-sign-up/cust-sign-up.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ViewRewardsService} from '../view-rewards.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public cust = new Customer();
  constructor(public matDialog: MatDialog, public viewRewardsService:ViewRewardsService) {
    this.cust = viewRewardsService.getCustRewards();
   }

  ngOnInit(): void {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CustSignUpComponent, dialogConfig);
  }

}
