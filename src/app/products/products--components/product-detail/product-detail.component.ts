import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/cart--services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product: any;  // Para almacenar el producto que recibimos del estado

  constructor(private router: Router, private cartService: CartService) {
    // Accedemos al producto desde el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];
  }

  ngOnInit(): void {
    console.log('product: ', this.product);

    if (!this.product) {
      console.log('No se encontró el producto');
      // Redirigir o mostrar un mensaje de error si no se pasó un producto
    }
  }

  // Método para agregar un producto al carrito
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
