import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

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
    ])
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((res) => {
        this.statistics = res;
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
