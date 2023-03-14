import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  transactionNumber:number = 0
  cartDataList:any = []
  purchasedDataList: any = []
  purchasedList = new BehaviorSubject<any>([])
  productList = new BehaviorSubject<any>([])

  getProductData() {
    this.cartDataList = JSON.parse(localStorage.getItem("productList") || "[]")
    this.productList.next(this.cartDataList)
    return this.productList.asObservable();
  }

  increaseQuantity(product: any) {
    product.quantity += 1
    product.total = product.quantity * product.price
    product.price = product.quantity * product.price
    this.addToChart(product);
  }

  decreaseQuantity(product: any) {
    if(product.quantity > 1) {
      product.quantity -= 1
      product.total = product.quantity * product.price
      this.addToChart(product);
    } else this.removeCartData(product)
  }


  addToChart(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      product.id === a.id ? this.cartDataList.splice(index, 1) : null
    })
    this.cartDataList.push(product)
    this.productList.next(this.cartDataList)
    localStorage.setItem('productList', JSON.stringify(this.productList.value))
  }

  removeCartData(product:any) {
    this.cartDataList.map((a:any, index:any) => {
      product.id === a.id ? this.cartDataList.splice(index, 1) : null
      this.productList.next(this.cartDataList)
    })
    this.productList.next(this.cartDataList)
    localStorage.setItem('productList', JSON.stringify(this.productList.value))
  }

  moveToPurchase(data:any) {
    this.clearProductList()
    this.getPurchasedListWithTransactionNumber(data)
    localStorage.setItem('purchasedList', JSON.stringify(this.purchasedList.value))
    localStorage.setItem('transactionNumber', JSON.stringify(this.transactionNumber))
    this.productList.next(this.cartDataList);
  }

  private getPurchasedListWithTransactionNumber(data:any) {
    this.transactionNumber = (parseInt(localStorage["transactionNumber"]) || 0) + 1
    this.purchasedDataList = JSON.parse(localStorage.getItem("purchasedList") || "[]");
    data.filteredData.forEach((a:any) => {
      Object.assign(a, {transactionNumber:this.transactionNumber})
      this.purchasedDataList.push(a);
    });
    this.purchasedList.next(this.purchasedDataList)
  }

  private clearProductList() {
    localStorage.removeItem('productList');
    this.cartDataList = [];
  }
}

