import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { OrderStatus } from '../order-status.type';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: string;

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  onStatusChange(event) {
    this.ordersService
      .editOrder(this.order.id, { status: event.value })
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order status updated!',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order status is not updated!',
          });
        }
      );
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.ordersService.findOrder(params['id']).subscribe((order) => {
          this.order = order;
          console.log(
            '🚀 ~ file: orders-detail.component.ts ~ line 32 ~ OrdersDetailComponent ~ this.ordersService.findOrder ~ order',
            order
          );
          this.selectedStatus = order.status;
        });
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        key: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
}
