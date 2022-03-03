import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';

export const CART = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this._getCart();
    if (!cart) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem(CART, JSON.stringify(initialCart));
    }
  }

  setCartItem(cartItem: CartItem): Cart | null {
    const cart = this._getCart();
    const isCartItemExist = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (isCartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem?.quantity;
        }
      });
    } else {
      cart?.items.push(cartItem);
    }
    localStorage.setItem(CART, JSON.stringify(cart));
    return cart;
  }

  private _getCart(): Cart {
    const cartJsonData: string = localStorage.getItem(CART) as string;
    const cart: Cart = JSON.parse(cartJsonData);
    return cart;
  }
}
