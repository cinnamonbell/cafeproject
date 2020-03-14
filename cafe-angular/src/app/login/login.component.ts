import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { Customer } from '../customer';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public loginService:LoginService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    console.log('username ' + data.username);
    console.log('password ' + data.password);
    let user:User = new User();
    user.username = data.username;
    user.password = data.password;
    console.log(user);
    //console.log(this.loginService.login(user).subscribe());
    this.loginService.login(user.username, user.password);
    this.closeModal();
 }

  closeModal() {
    this.dialogRef.close();
  }

}
