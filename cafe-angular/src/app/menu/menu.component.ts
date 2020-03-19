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
  public count:number = 0;
  public cust: Customer = null;
  public user: User;
  public order:Order = new Order();
  public menuItemList: MenuItem[];
  public currentMenu: MenuItem[] = [];
  public orderItem:OrderItem[] = [];
  public orderItems:OrderItem[];
  public totPrice:number = 0;
  public unique:OrderItem[];

  constructor(private menuService: MenuService, private orderService:OrderService, private loginService: LoginService) {
    //this.menuItem = MenuService.getMenuItems();
    menuService.getMenuItems().subscribe((resp:Array<MenuItem>) => {
      this.menuItemList = resp;
      let oi: OrderItem;
      this.orderItems = [];
      this.menuItemList.forEach((menuItem, index) => {
        console.log(menuItem);
        oi = new OrderItem();
        oi.menuItem = menuItem;
        oi.quantity = 0;
        this.orderItems.push(oi);
      });    console.log(this.orderItems);
    });
  }

  ngOnInit(): void {
  }

  addToOrder(ord:OrderItem){
    ord.quantity += 1;
    this.orderItem.push(ord);
    this.totPrice+=ord.menuItem.price;
    //console.log(this.orderItem);
    this.unique = this.orderItem.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })
  console.log(this.unique);
  }


  
  removeFromOrder(ord:OrderItem){
    ord.quantity-=1;
    let index:number = this.orderItem.indexOf(ord);
    this.orderItem.splice(index,1);
    this.totPrice -= ord.menuItem.price;
    console.log(this.orderItem);
  }

  submitOrder(){
      this.loginService.getLoggedInUser().subscribe(user => {this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null;});
      console.log(this.user);
      console.log(this.currentMenu);
      this.order.customer = this.user.customer;
      this.order.orderItems = this.unique;
      this.order.price = this.totPrice;
      this.order.status = null; 
      this.order.address = null; // do address later
      this.order.orderTime = null; // do later
      this.order.lastActionTime = null; // do later
      console.log(this.order);
      this.orderService.subOrder(this.order).subscribe();
  }
}

