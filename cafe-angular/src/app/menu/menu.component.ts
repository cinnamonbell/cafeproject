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

  constructor(private MenuService: MenuService) {
    this.menuItem = MenuService.getMenuItems();
  }

  ngOnInit(): void {
    for (let m of this.menuItem){

    }
  }

}
