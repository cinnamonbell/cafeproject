import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { User } from './user';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class ViewRewardsService {
public loggedUser:User = new User();
  constructor(public loginService:LoginService) { }

  getCustRewards():User{
    this.loggedUser = this.loginService.getLoggedInUser();
    console.log(this.loggedUser);

    return this.loggedUser;
  }
}
