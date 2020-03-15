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
  public cust: Customer = null;
  public user: User;
  constructor(public matDialog: MatDialog, public viewRewardsService: ViewRewardsService, public loginService: LoginService) {

  }
  

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(user => {this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null;});
    console.log(this.user);
  }


  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    this.matDialog.open(CustSignUpComponent, dialogConfig);
  }

  openLoginModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    this.matDialog.open(LoginComponent, dialogConfig);
  }

}
