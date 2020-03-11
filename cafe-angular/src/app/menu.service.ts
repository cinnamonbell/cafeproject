import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems(): MenuItem[]{ 
    //implementation needed
    //currently contains mock data
    let menuItem:MenuItem = new MenuItem();
    menuItem = new MenuItem();
    menuItem.id = 1;
    menuItem.name = "Coffee";
    menuItem.price = 3.00;
    menuItem.quantity = 10;
    console.log(menuItem);
    return [menuItem];
  }
}
