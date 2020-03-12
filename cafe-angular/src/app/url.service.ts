import { Injectable } from '@angular/core';
import { UrlMap } from './url-map';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private urlMap = new UrlMap();

  constructor() { }

  getPendingOrdersUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl+"/pending";
  }

  getLoginUrl(): string{
    console.log(this.urlMap.baseServerUrl+this.urlMap.loginUrl);
    return this.urlMap.baseServerUrl+this.urlMap.loginUrl;
  }
  getSignUpUrl(): string{
      return this.urlMap.baseServerUrl+this.urlMap.signUp;
  }
}
