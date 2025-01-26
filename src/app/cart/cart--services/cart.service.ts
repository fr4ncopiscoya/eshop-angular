import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  $modal = new EventEmitter<any>();

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
  removeOneFromCart(product: any) {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 }; // Reducir la cantidad
      }
      return item;
    }).filter(item => item.quantity > 0); // Filtrar productos con cantidad > 0

    this.cartItemsSubject.next(updatedItems);
  }

  removeAllFromCart(product: any) {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.filter(item => item.id !== product.id); // Eliminar por completo

    this.cartItemsSubject.next(updatedItems);
  }

  // Vaciar todo el carrito
  clearCart() {
    this.cartItemsSubject.next([]);
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

  // Obtener el subtotal del carrito
  getCartSubtotal(): number {
    return this.cartItemsSubject.value.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }
}
