import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerOrdersComponent } from 'src/app/customer-orders/customer-orders.component';
import { EmpViewReviewsComponent } from 'src/app/emp-view-reviews/emp-view-reviews.component';
import { HomePageComponent } from 'src/app/home-page/home-page.component';


const routes: Routes = [
  { path: 'pending-orders', component: PendingOrdersComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'review', component: CustomerOrdersComponent},
  { path: 'customer-reviews', component: EmpViewReviewsComponent },
  { path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
