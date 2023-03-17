import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderHistoryModule } from './order-history/order-history.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {CartModuleModule} from "./cart-module/cart-module.module";
import {ProductModuleModule} from "./product-module/product-module.module";
import {BaseModuleModule} from "./base-module/base-module.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    OrderHistoryModule,
    CartModuleModule,
    ProductModuleModule,
    BaseModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
