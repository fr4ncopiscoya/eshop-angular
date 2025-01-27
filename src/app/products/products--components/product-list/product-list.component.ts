import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products--services/product.service';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/spinner.service';
import { CartService } from '../../../cart/cart--services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];  // Array para almacenar los productos
  category: string | null = null;  // Variable para almacenar la categoría

  private routeSub: Subscription | undefined;  // Suscripción a los cambios de la ruta
  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      this.category = params['category'] || null;
      this.listProducts();
    });
  }
  ngOnDestroy(): void {
    // Nos aseguramos de cancelar la suscripción cuando el componente se destruya para evitar fugas de memoria
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  // Método para agregar un producto al carrito
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  // Método para redirigir al detalle del producto
  goToProductDetail(product: any): void {
    console.log('vamoos', product);

    // Usar router.navigate() con state
    this.router.navigate(['/product--detail'], { state: { product: product } });
  }

  listProducts(): void {
    this.spinnerService.showSpinner();
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe({
        next: (data) => {
          console.log('productByCategeroy? ', data)
          this.products = data;
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          console.log('products? ', data)
          this.products = data;
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    }
    // this.productService.getAllProducts().subscribe({
    //   next: (data) => {
    //     console.log('products? ', data)
    //     this.products = data;
    //     this.spinnerService.hideSpinner();
    //   },
    //   error: (error) => {
    //     console.log('Error: ', error);
    //   },
    // });
  }
}
