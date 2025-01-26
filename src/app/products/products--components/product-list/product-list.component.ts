import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products--services/product.service';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/spinner.service';
import { CartService } from '../../../cart/cart--services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  products: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.spinnerService.showSpinner();
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.spinnerService.hideSpinner();
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  // Método para agregar un producto al carrito
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
