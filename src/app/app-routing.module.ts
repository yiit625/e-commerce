import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'products', pathMatch: 'full'},
  {path:'products', loadChildren:() => import('./product-module/product-module.module').then(m => m.ProductModuleModule)},
  {path:'cart', loadChildren:() => import('./cart-module/cart-module.module').then(m => m.CartModuleModule)},
  {path:'history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
