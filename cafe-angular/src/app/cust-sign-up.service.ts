import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url.service';

@Injectable({
  providedIn: 'root'
})
export class CustSignUpService {

  constructor(private http:HttpClient, private urlService:UrlService) { }

  signUp(data: User) {
    console.log(data);
    this.http.post(this.urlService.getSignUpUrl(), data);

  }
}
