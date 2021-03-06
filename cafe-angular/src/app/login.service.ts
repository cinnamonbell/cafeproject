import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CookieService } from 'ngx-cookie-service';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedUser = new BehaviorSubject<User>(null);
  private user: User;

  constructor(private http: HttpClient, private url: UrlService, private cookie: CookieService) {
    if (this.cookie.check("user") && this.cookie.check("password")){
      let username: string = this.cookie.get("user");
      let password: string = this.cookie.get("password");
      let user = new User();
      user.username = username;
      user.password = password;
      this.login(user).subscribe();
    }
    this.loggedUser.subscribe( u => this.user = u);
   }

  getLoggedInUser(): Observable<User>{
    return this.loggedUser.asObservable();
  }

  updateCustomerInfo(customer: Customer ){
      let user: User = this.user;
      if (user) { 
      user.customer = customer;
      this.loggedUser.next(user);
      }
  }

  login(data: User): Observable<any> {
    console.log(this.url.getLoginUrl());
    return this.http.post(this.url.getLoginUrl(), data, { headers: this.url.getHeader() }).pipe(
      map(resp => 
        { const user: User = resp as User; 
          if(user){
            this.loggedUser.next(user);
            this.cookie.set("user", user.username);
            this.cookie.set("password", user.password);
            console.log("logged in");
            console.log(this.user);
          }
        }
      ));
  }
  clearLogin() {
    this.cookie.delete("user");
    this.cookie.delete("password");
    this.loggedUser.next(null);
  }
}

