import {Component, OnInit} from '@angular/core';
import {CartApiService} from "../services/cart-api.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allProducts: any = 0;
  displayedColumns: string[] | undefined;
  totalPrice: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private cartApi: CartApiService) {
    this.displayedColumns = ['position', 'imageUrl','title', 'category', 'price', 'quantity' ,'delete'];
  }
  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.cartApi.getProductData().subscribe(data => {
      this.dataSource.data = data;
      this.totalPrice = 0;
      data.map((a:any) => {
        this.totalPrice += a.total;
      });
    })
  }

  addProduct(item: any) {
    this.cartApi.increaseQuantity(item);
  }

  minusProduct(item: any) {
    this.cartApi.decreaseQuantity(item);
  }

  removeProduct(item: any) {
    this.cartApi.removeCartData(item)
    this.fetchProducts()
  }

  buyAll(){
    this.cartApi.moveToPurchase(this.dataSource);
  }
}
