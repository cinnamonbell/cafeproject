import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private itemRatings: Map<number, number>;
  constructor(private http:HttpClient, private urlService:UrlService) {
    this.http.get<Object>(this.urlService.getMenuUrl()+"/popular",
    {headers: this.urlService.getHeader()}).subscribe( data => {     
      this.itemRatings = new Map<number, number>();
      Object.keys(data).forEach(
        (key: string) => this.itemRatings.set(Number(key),data[key])
      )
    });
   }

   getItemRatings(): Map<number, number>{
     return this.itemRatings;
   }
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