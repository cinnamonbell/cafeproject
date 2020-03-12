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





  getSignUpUrl(): string{
      console.log('url: ' + this.urlMap.baseServerUrl+this.urlMap.signUp);
      return this.urlMap.baseServerUrl+this.urlMap.signUp;
  }
}
