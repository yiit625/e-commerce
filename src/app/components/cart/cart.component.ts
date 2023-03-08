import {Component, OnInit} from '@angular/core';
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
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private cartApi: CartapiService) {
  }
  ngOnInit() {
    this.displayedColumns = ['imageUrl','title', 'price', 'totalPrice'];
    this.cartApi.getProductData().subscribe(data => {
      this.dataSource = data
    })
  }

  removeProduct(item: any) {
    this.cartApi.removeCartData(item)
  }

  removeAllProduct() {
    this.cartApi.removeAllCart()
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.pageIndex = pe.pageIndex;
  }
}
