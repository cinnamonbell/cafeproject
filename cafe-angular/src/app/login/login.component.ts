import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';
import { ViewRewardsService } from 'src/app/view-rewards.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loggedUser:User = new User();
  public cust:Customer = null;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public loginService:LoginService, public viewRewards:ViewRewardsService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    console.log('username ' + data.username);
    console.log('password ' + data.password);
    let user:User = new User();
    user.username = data.username;
    user.password = data.password;
    console.log(user);

    this.loginService.login(user).subscribe(resp => { const user: User = resp as User; this.loggedUser = resp;});
    
    if (this.loggedUser != null) {
      this.cust = this.loggedUser.customer;
      console.log("in rewards " + this.cust)
      this.cust = this.viewRewards.getCustRewards();
    }
    console.log("yoyo");
    
    this.closeModal();
 }

  closeModal() {
    this.dialogRef.close();
  }

}
