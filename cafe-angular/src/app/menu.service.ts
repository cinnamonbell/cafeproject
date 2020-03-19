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
}
