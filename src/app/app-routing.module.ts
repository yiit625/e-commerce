import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {CartComponent} from "./components/cart/cart.component";
import {OrderHistoryComponent} from "./order-history/order-history/order-history.component";
import { OrderHistoryRoutingModule } from './order-history/order-history-routing.module';
const routes: Routes = [
  {path:'', redirectTo: 'products', pathMatch: 'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent},
  {path:'history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule)}
];

 // 'history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule)}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
