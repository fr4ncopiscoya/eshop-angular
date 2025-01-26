import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Estado inicial vacío
  cartItems$ = this.cartItemsSubject.asObservable(); // Exponemos el observable del carrito

  constructor() { }

  // Agregar un producto al carrito
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

  // Eliminar un producto del carrito
  removeFromCart(product: any) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== product.id);
    this.cartItemsSubject.next(updatedItems);
  }

  // Obtener los productos del carrito (ya es un observable)
  getCartItems() {
    return this.cartItems$; // Simplemente retornamos el observable
  }

  // Contar los productos en el carrito
  getCartItemCount() {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.quantity, 0);
  }
}
