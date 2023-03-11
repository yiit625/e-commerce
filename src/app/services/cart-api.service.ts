import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  cartDataList:any = []
  purchasedList: any = []
  productList = new BehaviorSubject<any>([])
  transactionNumber = new BehaviorSubject<number>(0)

  constructor() { }

  getProductData() {
    return this.productList.asObservable();
  }

  increaseQuantity(product: any) {
    product.quantity += 1 ;
    product.total = product.quantity * product.price;
    product.price = product.quantity * product.price;
    this.addToChart(product);
  }

  decreaseQuantity(product: any) {
    if(product.quantity > 1) {
      product.quantity -= 1 ;
      product.total = product.quantity * product.price;
      this.addToChart(product);
    } else this.removeCartData(product)
  }

  addToChart(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      if (product.id === a.id) {
        this.cartDataList.splice(index, 1)
      }
    })
    this.cartDataList.push(product)
    this.productList.next(this.cartDataList)
  }

  removeCartData(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      if (product.id === a.id) {
        this.cartDataList.splice(index, 1)
      }
      this.productList.next(this.cartDataList)
    })
    this.productList.next(this.cartDataList)
  }

  removeAllCart() {
    this.cartDataList = []
    this.productList.next(this.cartDataList)
  }

  moveToPurchase(data:any){
    this.transactionNumber.next(this.transactionNumber.value + 1)
    this.cartDataList = [];
    data.filteredData.forEach((a:any, index:any) => {
      Object.assign(a, {transactionNumber:this.transactionNumber.value})
      this.purchasedList.push(a);
    });
    this.productList.next(this.cartDataList);
  }
}

