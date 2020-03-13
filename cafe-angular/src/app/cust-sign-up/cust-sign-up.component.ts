import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../customer';
import { User } from '../user';
import { CustSignUpService } from 'src/app/cust-sign-up.service';

@Component({
  selector: 'app-cust-sign-up',
  templateUrl: './cust-sign-up.component.html',
  styleUrls: ['./cust-sign-up.component.css']
})
export class CustSignUpComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<CustSignUpComponent>, public signUpService:CustSignUpService) { }

  ngOnInit(): void {

  }

  onClickSubmit(data) {
    console.log('username ' + data.username);
    console.log('password ' + data.password);
    console.log('firstname ' + data.firstname);
    console.log('lastname ' + data.lastname);
    let cust:Customer = new Customer();
    let user:User = new User();
  
    cust.first = data.firstname;
    cust.last = data.lastname;
    console.log(cust);
    user.username = data.username;
    user.password = data.password;
    user.customer = cust;
    console.log(user);
    this.signUpService.signUp(user).subscribe();
    this.closeModal();
 }

  closeModal() {
    this.dialogRef.close();
  }

}
