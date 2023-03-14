import {Component, OnInit} from '@angular/core';
import { CartApiService } from 'src/app/services/cart-api.service';
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../../model/Group";
import {OrderHistoryService} from "../../services/order-history.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public dataSource = new MatTableDataSource<any | Group>([]);

  displayedColumns: string[] | undefined;
  groupByColumns: string[] = [];
  purchasedList:any = []

  constructor(private orderHistoryService: OrderHistoryService) {
    this.displayedColumns = ['imageUrl','title', 'category', 'price', 'quantity'];
    this.groupByColumns = ['transactionNumber'];
  }

  ngOnInit() {
    this.fetchProducts();
    this.setProducts();
  }

  fetchProducts() {
    this.orderHistoryService.getPurchasedData().subscribe(data => {
      this.purchasedList = data;
    })
  }

  setProducts() {
    this.dataSource.data = this.addGroups(this.purchasedList, this.groupByColumns);
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    return this.subLevel(data, 0, groupByColumns);
  }

  subLevel(data: any[], level: number, groupByColumns: string[]): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result:any = new Group();
          result.level = level + 1;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ), JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups:any = [];
    groups.forEach((group: any) => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      rowsInGroup.forEach(a => {
        group.totalCounts += a.quantity
        group.totalPrice += a.price
      })
      const subGroup = this.subLevel(rowsInGroup, level + 1, groupByColumns);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  // Finding the unique properties
  uniqueBy(a:any, key:any) {
    const seen:any = {};
    return a.filter((item:any) => {
      return seen.hasOwnProperty(key(item)) ? false : (seen[key(item)] = true);
    });
  }

  isGroup(index:any, item:any): boolean {
    return item.level;
  }

}
