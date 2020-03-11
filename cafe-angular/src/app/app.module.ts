import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ViewRewardsComponent } from './view-rewards/view-rewards.component';
import { CustSignUpComponent } from './cust-sign-up/cust-sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PendingOrdersComponent,
    ViewRewardsComponent,
    CustSignUpComponent,
    NavBarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
