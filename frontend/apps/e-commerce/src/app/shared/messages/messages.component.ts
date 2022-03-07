import { Component, OnInit } from '@angular/core';
import { CartService } from '@frontend/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'shop-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Cart Updated!',
      });
    });
  }
}
