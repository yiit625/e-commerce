import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  purchasedDataList: any = []
  purchasedList = new BehaviorSubject<any>([])

  constructor() { }

  getPurchasedData() {
    this.purchasedDataList = JSON.parse(localStorage.getItem("purchasedList") || "[]");
    this.purchasedList.next(this.purchasedDataList)
    return this.purchasedList.asObservable()
  }
}
