import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';
import { ViewRewardsService } from 'src/app/view-rewards.service';
import { BehaviorSubject } from 'rxjs';

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

  ngOnChanges(changes: SimpleChanges):void{
    console.log(changes.cust);
    console.log("What up what up" + this.cust);
  }
  onClickSubmit(data) {
    console.log('username ' + data.username);
    console.log('password ' + data.password);
    let user:User = new User();
    user.username = data.username;
    user.password = data.password;
    console.log(user);

    this.loginService.login(user).subscribe();
    
    console.log("yoyo");
    
    this.closeModal();
 }

  closeModal() {
    this.dialogRef.close();
  }

}
