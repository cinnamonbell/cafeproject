import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})
export class CustSignUpService {

  constructor() { }

  signUp(data: User) {
    console.log(data);

  }
}
