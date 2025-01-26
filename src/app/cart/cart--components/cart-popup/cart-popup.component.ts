import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../cart--services/cart.service';

@Component({
  selector: 'app-cart-popup',
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.scss'
})
export class CartPopupComponent {
  cartItems: any = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Suscribirse a los productos del carrito
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    console.log('cartItems: ', this.cartItems);

  }

  closeModal() {
    console.log('hola');

  }

  // Método para calcular el total
  getTotal() {
    // return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
