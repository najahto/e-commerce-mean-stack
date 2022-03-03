export class Cart {
  items: CartItem[] = [];
}

export class CartItem {
  productId?: string;
  quantity = 0;
}
