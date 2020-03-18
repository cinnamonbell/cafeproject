import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';
import { OrderItem } from '../order-item';
import { OrderService } from '../order.service';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';
import { Order } from '../order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  public cust: Customer = null;
  public user: User;
  public order:Order = new Order();
  public menuItemList: MenuItem[];
  public currentMenu: MenuItem[] = [];
  public orderItem:OrderItem[] = [];
  public totPrice:number = 0;
  constructor(private menuService: MenuService, private orderService:OrderService, private loginService: LoginService) {
    //this.menuItem = MenuService.getMenuItems();
    menuService.getMenuItems().subscribe((resp:Array<MenuItem>) => {
      this.menuItemList = resp;
      this.menuItemList.forEach((menuItem) => {
        console.log(menuItem);
      })
    });
  }

  ngOnInit(): void {
  }

  addToOrder(menu:MenuItem){
    this.currentMenu.push(menu);
    
    this.totPrice += menu.price;
    console.log(this.totPrice);
    console.log(this.currentMenu);
  }
  
  removeFromOrder(menu:MenuItem){
    let index:number = this.currentMenu.indexOf(menu);
    this.currentMenu.splice(index,1);
    this.totPrice -= menu.price;
    console.log(this.currentMenu);
  }

  submitOrder(){
      this.loginService.getLoggedInUser().subscribe(user => {this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null;});
      console.log(this.user);
      console.log(this.currentMenu);

      this.order.customer = this.user.customer;
      console.log(this.user.customer);
      
      
  }
}
