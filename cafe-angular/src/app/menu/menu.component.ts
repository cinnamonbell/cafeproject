import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  public menuItem: MenuItem[];
  public food: MenuItem[];

  constructor(private MenuService: MenuService) {
    this.menuItem = MenuService.getMenuItems();
    this.food = MenuService.getMenuItems();
  }

  ngOnInit(): void {
    //Beverages
    for (let m of this.menuItem){
    }
    // Food
    for(let f of this.food){
    }
  }

}
