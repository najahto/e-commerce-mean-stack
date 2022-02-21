import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getOrder();
  }
  onStatusChange(event: any) {}

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
}
