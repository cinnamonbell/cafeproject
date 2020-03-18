import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';
import { Order } from '../order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  public menuItemList: MenuItem[];

  constructor(private menuService: MenuService) {
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

}
