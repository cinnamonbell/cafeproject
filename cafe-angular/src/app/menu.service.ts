import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private appUrl = this.urlService.getMenuUrl() + 'menu';

  constructor(private http:HttpClient, private urlService:UrlService) { }

  getMenuItems(): Observable<Array<MenuItem>>{ 
    let menuArray:Array<MenuItem> = [];
    console.log(menuArray);
    return this.http.get<MenuItem[]>(this.urlService.getMenuUrl(), {headers: this.urlService.getHeader()}).pipe();
  }

  updateMenuItems(menuI:MenuItem): Observable<MenuItem>{
    console.log(menuI);
    console.log(this.urlService.getMenuUrl());
    return this.http.put<MenuItem>(this.urlService.getUpdateMenuUrl(menuI.id), menuI, {headers: this.urlService.getHeader()}).pipe(); //check this
  }
}

// return this.http.put<Order>(this.url.getUpdateOrderUrl(order.id), order, 
//     {headers: this.url.getHeader() }).pipe();