import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderStatusPipe } from './order-status.pipe';
import { CustOrderCommentComponent } from './cust-order-comment/cust-order-comment.component';
import { EmpViewReviewsComponent } from './emp-view-reviews/emp-view-reviews.component';


@NgModule({
  declarations: [
    AppComponent,
    PendingOrdersComponent,
    MenuComponent,
    ViewRewardsComponent,
    CustSignUpComponent,
    NavBarComponent,
    LoginComponent,
    CustomerOrdersComponent,
    OrderUpdateComponent,
    OrderStatusPipe,
    CustOrderCommentComponent,
    EmpViewReviewsComponent

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
