import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

//component for employee user to see and respond to pending orders
export class MenuComponent implements OnInit {

  public menuList: MenuItem[];

  constructor(private orderService: MenuService) {
    this.menuList = orderService.getMenuItems();
   }

  ngOnInit(): void {
    for (let m of this.menuList){

    }
  }

}
