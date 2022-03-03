import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { environment } from '@frontend/admin/environments';
import { CartItem, CartService } from '@frontend/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  host: string = environment.host;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    console.log("🚀 ~ file: product-item.component.ts ~ line 24 ~ ProductItemComponent ~ addToCart ~ cartItem", cartItem)
    this.cartService.setCartItem(cartItem);
  }
}
