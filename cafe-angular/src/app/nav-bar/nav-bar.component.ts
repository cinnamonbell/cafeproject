import { Component, OnInit } from '@angular/core';
import { CustSignUpComponent } from 'src/app/cust-sign-up/cust-sign-up.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewRewardsService } from '../view-rewards.service';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';
import { CustOrderCommentComponent } from 'src/app/cust-order-comment/cust-order-comment.component';
import { CustomerOrdersComponent } from 'src/app/customer-orders/customer-orders.component';
import { OrderService } from 'src/app/order.service';
import { Order } from 'src/app/order';
import { MenuService } from 'src/app/menu.service';
import { MenuItem } from 'src/app/menu-item';
import { OrderItem } from 'src/app/order-item';
import { CustSignUpService } from 'src/app/cust-sign-up.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],

})
export class NavBarComponent implements OnInit {
  public cust: Customer;
  public user: User;
  public order: Order = new Order();
  public menuItemList: MenuItem[];
  public items: OrderItem[] = [];

  constructor(private menuService: MenuService, public matDialog: MatDialog, public viewRewardsService: ViewRewardsService, public loginService: LoginService, private orderService: OrderService, public custService:CustSignUpService) {
    this.loginService.getLoggedInUser().subscribe(user => { this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null; });
  }


  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(user => { this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null; });
    console.log(this.user);
            // Add active class to the current button (highlight it)
            var header = document.getElementById("myDIV");
            var btns = header.getElementsByClassName("btn");
            console.log(btns);
            for (var i = 0; i < btns.length; i++) {
              btns[i].addEventListener("click", function() {
              var current = document.getElementsByClassName("active");
              current[0].className = current[0].className.replace(" active", "");
              this.className += " active";
              });
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

  claimReward() {
    console.log('claim reward');
    this.menuService.getMenuItems().subscribe((resp: Array<MenuItem>) => {
      this.menuItemList = resp;
      console.log(this.menuItemList);
      // for (let i = 0; i < this.menuItemList.length; i++) {
      //   console.log(this.menuItemList[i]);
      // }
      console.log(this.menuItemList[5]);
      let oi = new OrderItem();
      oi.menuItem = this.menuItemList[7];
      oi.quantity = 1;
      this.items.push(oi);
      let oi1 = new OrderItem();
      oi1.menuItem = this.menuItemList[5];
      oi1.quantity = 1;
      this.items.push(oi1);
      let oi2 = new OrderItem();
      oi2.menuItem = this.menuItemList[9];
      oi2.quantity = 1;
      this.items.push(oi2);
      this.order.customer = this.cust;
      this.order.orderItems = this.items;
      this.order.price = 0;
      this.order.status = null;
      this.order.address = null; // do address later
      this.order.orderTime = null; // do later
      this.order.lastActionTime = null;
      this.cust.stars = 0;
      this.custService.removeStars(this.cust).subscribe();
      this.orderService.subOrder(this.order).subscribe();
      window.location.reload();


    });
  }

  logout() {
    console.log('logout');
    this.user = null;
    this.cust = null;
    this.loginService.clearLogin();
  }



}
