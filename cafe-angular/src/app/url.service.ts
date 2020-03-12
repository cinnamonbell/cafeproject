import { Injectable } from '@angular/core';
import { UrlMap } from './url-map';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private static readonly MONOLITH_URL = 'http://localhost:8080';

  private urlMap: UrlMap;

  constructor() { }

  getPendingOrdersUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl+"/pending";
  }
  getMenuUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.menuUrl;
  }
}
