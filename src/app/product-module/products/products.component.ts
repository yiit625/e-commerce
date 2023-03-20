import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {CartApiService} from "../../cart-module/services/cart-api.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any;
  constructor(private api:ApiService, private cartApi: CartApiService) {
  }
  ngOnInit() {
    // this.api.getProduct().subscribe(res=>{
    this.api.findProducts().subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {quantity:1, total:a.price})
      })
    })
  }

  addToCart(product:any) {
    this.cartApi.addToChart(product)
  }

}
