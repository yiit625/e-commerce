import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartDataList:any = []
  purchasedList: any = []
  productList = new BehaviorSubject<any>([])
  constructor() { }

  getProductData() {
    return this.productList.asObservable();
  }

  addToChart(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      if (product.id === a.id) {
        this.cartDataList.splice(index, 1)
      }
    })
    this.cartDataList.push(product)
    this.productList.next(this.cartDataList)
    this.getTotalAmount();
    console.log(this.cartDataList)
  }

  getTotalAmount() {
    let grandTotal = 0
    this.cartDataList.map((a:any) => {
      grandTotal += a.total
    })
  }

  removeCartData(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      if (product.id === a.id) {
        this.cartDataList.splice(index, 1)
      }
      this.productList.next(this.cartDataList)
    })
  }

  removeAllCart() {
    this.cartDataList = []
    this.productList.next(this.cartDataList)
  }
  moveToPurchase(data:any){
    this.cartDataList = [];
    data.filteredData.forEach((a:any, index:any) => {
      this.purchasedList.push(a);
    });
    console.log(this.purchasedList);
    this.productList.next(this.cartDataList);
  }
}

