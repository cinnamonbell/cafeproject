import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private appUrl = this.urlService.getMenuUrl() + 'menu';

  constructor(private http:HttpClient, private urlService:UrlService) { }

  getMenuItems(): MenuItem[]{ 
    let menuArray:Array<MenuItem> = [];
    this.http.get<MenuItem[]>(this.urlService.getMenuUrl()).pipe().subscribe((resp:Array<MenuItem>) => menuArray = resp);
    return menuArray;
    //implementation needed
    //currently contains mock data
    // let menuItem:MenuItem = new MenuItem();
    // menuItem = new MenuItem();
    // menuItem.id = 1;
    // menuItem.name = "Coffee";
    // menuItem.price = 3.00;
    // menuItem.quantity = 10;
    // console.log(menuItem);
    // let menuItem2 = new MenuItem();
    // menuItem2.id = 2;
    // menuItem2.name = "Espresso";
    // menuItem2.price = 3.25;
    // menuItem2.quantity = 9;
    // console.log(menuItem2);
    // let food:MenuItem = new MenuItem();
    // food = new MenuItem();
    // food.id = 3;
    // food.name = "Croissant";
    // food.price = 3.50;
    // food.quantity = 4;
    // console.log(food);
    // let food2 = new MenuItem();
    // food2.id = 4;
    // food2.name = "Bagel";
    // food2.price = 5.00;
    // food2.quantity = 8;
    // console.log(food2);
    // return [menuItem, menuItem2, food,food2];
  }
}
