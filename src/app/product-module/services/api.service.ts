import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getProduct() {
    return this.http.get("https://fakestoreapi.com/products").pipe(map((res:any) =>{
      return res;
    }));
  }

  findProducts() : Observable<any>{
    return this.http.get<any>("../../assets/products.json").pipe(shareReplay(1000));
  }
}
