import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CartRoutingModule} from "./cart-routing.module";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    CartRoutingModule
  ]
})
export class CartModuleModule { }
