import {ChangeDetectorRef,Component, OnInit} from '@angular/core';
import {CartapiService} from "../../services/cartapi.service";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProducts: any = 0;
  displayedColumns: string[] | undefined;
  pageIndex: number = 0;
  pageSize: number = 10;
  totalPrice: number = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private cartApi: CartapiService, private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.displayedColumns = ['imageUrl','title', 'price', 'totalPrice', 'quantity' ,'delete'];
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
    item.quantity += 1 ;
    item.total = item.quantity * item.price;
    this.cartApi.addToChart(item);
  }
  minusProduct(item: any) {
    item.quantity -= 1 ;
    item.total = item.quantity * item.price;
    this.cartApi.addToChart(item);
  }
  removeProduct(item: any) {
    this.cartApi.removeCartData(item);
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
