import { Component } from '@angular/core';
import { CartService } from '../../cart--services/cart.service';
import { CommonModule } from '@angular/common';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';

@Component({
  selector: 'app-cart-button',
  imports: [CommonModule, CartPopupComponent],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss'
})
export class CartButtonComponent {
  cartItemCount: number = 0;
  cartData: any;
  isModalOpen: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.$modal.subscribe((value) => this.isModalOpen = value)
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  openCart(): void {
    this.isModalOpen = true;

    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartData = data;
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }
}
