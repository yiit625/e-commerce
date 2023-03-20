import {Component, OnInit} from '@angular/core';
import {CartApiService} from "../../cart-module/services/cart-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedItemNumber: number = 0

  constructor(private cartApi: CartApiService) {}

  ngOnInit() {
    this.cartApi.getProductData().subscribe(data => {
      this.selectedItemNumber = data.length
    })
  }
}
