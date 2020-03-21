import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private url: UrlService, private cookie: CookieService) {
    if (this.cookie.check("user") && this.cookie.check("password")){
      let username: string = this.cookie.get("user");
      let password: string = this.cookie.get("password");
      let user = new User();
      user.username = username;
      user.password = password;
      this.login(user).subscribe();
    }
   }

  getLoggedInUser(): Observable<User>{
    return this.loggedUser.asObservable();
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
          }
        }
      ));
  }
  clearLogin() {
    this.cookie.delete("user");
    this.cookie.delete("password");
  }
}

