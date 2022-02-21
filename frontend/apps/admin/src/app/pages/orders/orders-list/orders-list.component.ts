import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

/* const ORDER_STATUS = {
  Pending: {
    color: 'primary',
  },
  Processed: {
    color: 'warning',
  },
  Shipped: {
    color: 'warning',
  },
  Delivered: {
    color: 'success',
  },
  Failed: {
    color: 'danger',
  },
}; */
const ORDER_STATUS = {
  pending: {
    label: 'Pending',
    color: 'primary',
  },
  processed: {
    label: 'Processed',
    color: 'warning',
  },
  shipped: {
    label: 'Shipped',
    color: 'warning',
  },
  delivered: {
    label: 'Delivered',
    color: 'success',
  },
  failed: {
    label: 'Failed',
    color: 'danger',
  },
};

type orderStatus = {
  [key: string]: { label: string; color: string };
};

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  orderStatus: orderStatus = ORDER_STATUS;
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
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
