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
  getOrderUrl(): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl;
  }
  getUpdateOrderUrl(id: number): string{
    return this.urlMap.baseServerUrl+this.urlMap.orderUrl+"/"+id;
  }

  getHeader(): HttpHeaders{
    let headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return headers;
  }

  getCustOrder(): string{
    return this.urlMap.baseServerUrl+this.urlMap.custOrder;
  }

  getGoodReview(): string{
    return this.urlMap.baseServerUrl+this.urlMap.review+'/good';
  }

  getBadReview(): string{
    return this.urlMap.baseServerUrl+this.urlMap.review+'/bad';
  }

  getCommentReview(): string{
    return this.urlMap.baseServerUrl+this.urlMap.review+'/comment';
  }

}
