import { Component, OnInit } from '@angular/core';
import { CustSignUpComponent } from 'src/app/cust-sign-up/cust-sign-up.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewRewardsService } from '../view-rewards.service';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public cust = null;
  public user = null;
  constructor(public matDialog: MatDialog, public viewRewardsService: ViewRewardsService, public loginService: LoginService) {

  }
  

  ngOnInit(): void {
    this.user = this.loginService.getLoggedInUser();
    if (this.user != null) {
      this.cust = this.user.customer;
      console.log("in rewards " + this.cust)
      //this.cust = this.viewRewards.getCustRewards();
    }
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

  openLoginModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
  }

}
