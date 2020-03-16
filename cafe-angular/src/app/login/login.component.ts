<<<<<<< HEAD
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
=======
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
>>>>>>> a9a557b39cc11cd1e2e275be41b77cb8746fb294
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
export class LoginComponent implements OnInit, OnChanges {

  public loggedUser:User = new User();
  @Input()
  public cust:Customer = null;

  

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public loginService:LoginService, public viewRewards:ViewRewardsService) { }

  ngOnInit(): void {
  }

<<<<<<< HEAD

=======
  ngOnChanges(changes: SimpleChanges):void{
    console.log(changes.cust);
    console.log("What up what up" + this.cust);
  }
>>>>>>> a9a557b39cc11cd1e2e275be41b77cb8746fb294
  onClickSubmit(data) {
    console.log('username ' + data.username);
    console.log('password ' + data.password);
    let user:User = new User();
    user.username = data.username;
    user.password = data.password;
    console.log(user);

    this.loginService.login(user).subscribe();
    
<<<<<<< HEAD
    if (this.loggedUser != null) {
      this.cust = this.loggedUser.customer;
      console.log("in rewards " + this.cust)
      
    }
=======
    console.log("yoyo");
>>>>>>> a9a557b39cc11cd1e2e275be41b77cb8746fb294
    
    this.closeModal();
 }

  closeModal() {
    this.dialogRef.close();
  }

}
