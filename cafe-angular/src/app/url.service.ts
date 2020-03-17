import { Injectable } from '@angular/core';
import { UrlMap } from './url-map';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private static readonly MONOLITH_URL = 'http://localhost:8080';

  private urlMap = new UrlMap();

  constructor() { }

  getPendingOrdersUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl+"/pending";
  }
  getLoginUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.loginUrl;
  }
  getMenuUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.menuUrl;
  }
  getSignUpUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.signUp;
  }

  getHeader(): HttpHeaders{
    let headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return headers;
  }

  getCustOrder(): string{
    return this.urlMap.baseServerUrl+this.urlMap.custOrder;
  }

}
