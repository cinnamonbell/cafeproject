import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/order';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private url: UrlService) { }

  goodRating(order: Order): Observable<any> {
   
    return this.http.post(this.url.getGoodReview(), order, { headers: this.url.getHeader() }).pipe();
  }


  badRating(order: Order): Observable<any> {
 
    return this.http.post(this.url.getBadReview(), order, { headers: this.url.getHeader() }).pipe();
  }

  comment(order: Order): Observable<any> {
    
    return this.http.post(this.url.getCommentReview(), order, { headers: this.url.getHeader() }).pipe();
  }
}
