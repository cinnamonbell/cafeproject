import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private url: UrlService) { }

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
          }
        }
      ));
  }

  makingUser(): User {
    let user: User = new User();
    user.id = 1;
    user.customer = null;
    user.employee = null;
    user.username = "username";
    user.password = "password";
    return user;
  }


}
