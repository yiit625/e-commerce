import {Component, OnInit} from '@angular/core';
import {CartapiService} from "../../services/cartapi.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedItemNumber: number = 0

  constructor(private cartApi: CartapiService) {}

  ngOnInit() {
    this.cartApi.getProductData().subscribe(data => {
      this.selectedItemNumber = data.length
    })
  }
}
