import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url.service';

@Injectable({
  providedIn: 'root'
})
export class CustSignUpService {

  constructor(private http:HttpClient, private url:UrlService) { }

  signUp(data: User):Observable<Object> {
    console.log(this.url.getSignUpUrl());
    return this.http.post(this.url.getSignUpUrl(), data, {headers: this.url.getHeader()});

  }
}
