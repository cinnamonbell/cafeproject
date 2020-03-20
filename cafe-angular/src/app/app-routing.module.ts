import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerOrdersComponent } from 'src/app/customer-orders/customer-orders.component';


const routes: Routes = [
  { path: 'pending-orders', component: PendingOrdersComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'review', component: CustomerOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
