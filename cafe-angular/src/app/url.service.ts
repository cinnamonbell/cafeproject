import { Injectable } from '@angular/core';
import { UrlMap } from './url-map';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private urlMap: UrlMap) { }

  getPendingOrdersUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl+"/pending";
  }





  getSignUpUrl(): string{
      return this.urlMap.baseServerUrl+this.urlMap.signUp;
  }
}
