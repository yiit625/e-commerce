import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from "./products/products.component";
import {ProductRoutingModule} from "./product-routing.module";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModuleModule { }
