import {Component, OnInit} from '@angular/core';
import {CartApiService} from "../../services/cart-api.service";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allProducts: any = 0;
  displayedColumns: string[] | undefined;
  pageIndex: number = 0;
  pageSize: number = 10;
  totalPrice: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private cartApi: CartApiService) {}
  ngOnInit() {
    this.displayedColumns = ['position', 'imageUrl','title', 'category', 'price', 'quantity' ,'delete'];
    this.fetchProducts();
  }

  fetchProducts() {
    this.cartApi.getProductData().subscribe(data => {
      this.dataSource.data = data;
      this.totalPrice = 0;
      data.map((a:any) => {
        this.totalPrice += a.total;
        console.log(this.totalPrice);
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

  removeAllProduct() {
    this.cartApi.removeAllCart()
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.pageIndex = pe.pageIndex;
  }

  buyAll(){
    this.cartApi.moveToPurchase(this.dataSource);
  }
}
