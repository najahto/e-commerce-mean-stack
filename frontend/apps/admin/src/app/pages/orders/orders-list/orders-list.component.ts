import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrderStatus } from '../order-status.type';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus: OrderStatus = ORDER_STATUS;
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  showOrder(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }

  deleteOrder(id: string) {}

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
