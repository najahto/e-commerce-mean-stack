import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  statistics = [];

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.ordersService.getTotalSales(),
      this.usersService.getUsersCount(),
    ]).subscribe((res) => {
      this.statistics = res;
    });
  }
}
