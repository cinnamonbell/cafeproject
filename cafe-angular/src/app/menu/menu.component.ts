import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';
import { OrderItem } from '../order-item';
import { OrderService } from '../order.service';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';
import { Order } from '../order';
import { Address } from '../address';
import { Employee } from '../employee'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  public count: number = 0;
  public cust: Customer = null;
  public user: User;
  public employee: Employee = null;
  public order:Order = new Order();
  public menuItemList: MenuItem[];
  public currentMenu: MenuItem[] = [];
  public orderItem:OrderItem[] = [];
  public orderItems:OrderItem[];
  public totPrice:number = 0;
  public unique:OrderItem[];
  public address:Address = new Address();
  public what:number = 0;
  constructor(private menuService: MenuService, private orderService: OrderService, private loginService: LoginService) {
  }


  addToInventory(ord:OrderItem){
    let menI = ord.menuItem;
    menI.quantity += 1;
    console.log(menI.name + " inventory: " + menI.quantity);
    this.menuService.updateMenuItems(menI).subscribe();
  }

  getItemScore(item: MenuItem): number{
    if (!this.menuItemList || !item) return -1;
    let ratings: Map<number, number> = this.menuService.getItemRatings();
    if (ratings.has(item.id)) return ratings.get(item.id);
    else return -1;
  }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(user => {this.user = user; (user != null && user.customer != null) ? this.cust = user.customer : null;});
    console.log(this.user);
    this.menuService.getMenuItems().subscribe((resp: Array<MenuItem>) => {
      this.menuItemList = resp;
      let oi: OrderItem;
      this.orderItems = [];
      this.menuItemList.forEach((menuItem, index) => {
        console.log(menuItem);
        oi = new OrderItem();
        oi.menuItem = menuItem;
        oi.quantity = 0;
        this.orderItems.push(oi);
      }); console.log(this.orderItems);
    });
  }

  addToOrder(ord: OrderItem) {
    ord.quantity += 1;
    this.orderItem.push(ord);
    this.totPrice += ord.menuItem.price;
    //console.log(this.orderItem);
    this.unique = this.orderItem.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    console.log(this.unique);
  }
  
  yesButton(){
    console.log("yes");
    this.what = 1;
    this.address = new Address();
  }

  noButton(){
    console.log("no");
    this.what = 2;
    this.address = null;
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
      this.order.address = this.address; // do address later
      this.order.orderTime = null; // do later
      this.order.lastActionTime = null; // do later
      console.log(this.order);
      console.log(this.address);
      this.orderService.subOrder(this.order).subscribe(resp => { window.location.reload(); });
  }
}
