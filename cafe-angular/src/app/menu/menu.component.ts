import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';
import { OrderItem } from '../order-item';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  public menuItemList: MenuItem[];
  public currentMenu: MenuItem[] = [];
  constructor(private menuService: MenuService, private orderService:OrderService) {
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
    console.log(this.currentMenu);
    console.log(menu);
    this.currentMenu.push(menu);
    console.log(this.currentMenu);
  }
  removeFromOrder(menu:MenuItem){
    let index:number = this.currentMenu.indexOf(menu);
    this.currentMenu.splice(index,1);
    console.log(this.currentMenu);
  }

  submitOrder(){
    

  }
}
