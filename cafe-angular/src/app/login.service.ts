import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private url:UrlService) {}

  login(username:string, password:string):Observable<User>{
    let u = new User;
    u.username = username;
    u.password = password;
    const body = JSON.stringify(u);
    console.log(body);
    console.log(this.url.getLoginUrl());
    return this.http.post<string>(this.url.getLoginUrl(), body, {headers: this.url.getHeader()});
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
