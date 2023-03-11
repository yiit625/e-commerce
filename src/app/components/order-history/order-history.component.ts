import {AfterViewInit, Component, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CartApiService } from 'src/app/services/cart-api.service';
import {MatTableDataSource} from "@angular/material/table";

export class Group {
  level = 0;
  parent: Group | undefined;
  expanded = true;
  totalCounts = 0;
  totalPrice = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public dataSource = new MatTableDataSource<any | Group>([]);

  displayedColumns: string[] | undefined;
  groupByColumns: string[] = [];

  constructor(private cartApi: CartApiService) {
    this.displayedColumns = ['imageUrl','title', 'category', 'price', 'quantity'];
    this.groupByColumns = ['transactionNumber'];
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.dataSource.data = this.addGroups(this.cartApi.purchasedList, this.groupByColumns);
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result:any = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups:any = [];
    groups.forEach((group: any) => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      rowsInGroup.forEach(a => {
        group.totalCounts += a.quantity
        group.totalPrice += a.price
      })
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  groupHeaderClick(row:any) {
    row.expanded = !row.expanded;
  }

  uniqueBy(a:any, key:any) {
    const seen:any = {};
    return a.filter((item:any) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index:any, item:any): boolean {
    return item.level;
  }

}
