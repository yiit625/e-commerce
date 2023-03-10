import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CartapiService } from 'src/app/services/cartapi.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  displayedColumns: string[] | undefined;
  pageIndex: number = 0;
  pageSize: number = 10;
  // dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  previousProducts: any = 0;

  constructor(private cartApi: CartapiService) {
  }
  ngOnInit() {
    this.displayedColumns = ['imageUrl','title'];
    this.previousProducts = this.cartApi.purchasedList;
    console.log(this.previousProducts);
  }
  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.pageIndex = pe.pageIndex;
  }
}
