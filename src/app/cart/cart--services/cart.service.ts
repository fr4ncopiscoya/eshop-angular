import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  $modal = new EventEmitter<any>();

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(product: any) {
    const currentItems = this.cartItemsSubject.value;
    const productIndex = currentItems.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      // Si el producto no existe en el carrito, lo agregamos
      this.cartItemsSubject.next([...currentItems, { ...product, quantity: 1 }]);
    } else {
      // Si el producto ya está en el carrito, solo incrementamos la cantidad
      currentItems[productIndex].quantity++;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  removeOneFromCart(product: any) {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.cartItemsSubject.next(updatedItems);
  }

  removeAllFromCart(product: any) {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.filter(item => item.id !== product.id); // Eliminar por completo

    this.cartItemsSubject.next(updatedItems);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  getCartItems() {
    return this.cartItems$;
  }

  getCartItemCount() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartSubtotal(): number {
    return this.cartItemsSubject.value.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }
}
