import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ViewRewardsComponent } from './view-rewards/view-rewards.component';
import { CustSignUpComponent } from './cust-sign-up/cust-sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    PendingOrdersComponent,
    MenuComponent,
    ViewRewardsComponent,
    CustSignUpComponent,
    NavBarComponent,
    LoginComponent,
    CustomerOrdersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
