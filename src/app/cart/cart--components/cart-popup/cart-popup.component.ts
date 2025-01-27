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
  subtotal: number = 0;
  cartItems: any = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    document.body.style.overflow = 'hidden';

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    console.log('cartItems: ', this.cartItems);
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.calculateSubtotal(items);
    });
  }
  private calculateSubtotal(items: any[]): number {
    return items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  }
  closeModal() {
    this.cartService.$modal.emit(false);
  }

  addMore(product: any) {
    this.cartService.addToCart(product);
  }

  removeOneProduct(product: any) {
    this.cartService.removeOneFromCart(product);
  }

  removeFromCart(product: any) {
    this.cartService.removeAllFromCart(product);
  }

  removeAllFromCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    // Al destruir el componente (cerrar el modal), se reactiva el scroll en el body
    document.body.style.overflow = 'auto';
  }
}
