import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url.service';
import { map } from 'rxjs/internal/operators/map';
import { Customer } from 'src/app/customer';

@Injectable({
  providedIn: 'root'
})
export class CustSignUpService {

  public newUser: User;

  constructor(private http: HttpClient, private url: UrlService) { }

  signUp(data: User): Observable<any> {
    console.log(this.url.getSignUpUrl());
    return this.http.post(this.url.getSignUpUrl(), data, { headers: this.url.getHeader() }).pipe(
      map(resp => {
        const user: User = resp as User;
        if (user) {

          this.newUser = user;
          console.log('in custsignService');
          console.log(this.newUser);
        }
        else {
          alert('Username taken. Try a different Username');
        }
      }
      ));

  }

  removeStars(data: Customer): Observable<any> {
    return this.http.put(this.url.getRemoveStarspUrl(), data, { headers: this.url.getHeader() }).pipe(map(resp => {const cust: Customer = resp as Customer;}))
  }
}
