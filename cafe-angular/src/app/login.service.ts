import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

  constructor(private http:HttpClient, private url:UrlService) {}

  login(data:User):Observable<any>{
    console.log(this.url.getLoginUrl());
    return this.http.post<string>(this.url.getLoginUrl(), data, {headers: this.url.getHeader()}).pipe(map(resp => {const user:string = resp}));
  }

  makingUser():User{
    let user:User = new User();
    user.id = 1;
    user.customer = null;
    user.employee = null;
    user.username = "username";
    user.password = "password";
    return user;
  }

  
}
