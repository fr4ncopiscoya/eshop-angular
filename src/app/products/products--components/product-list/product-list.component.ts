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
  products: any[] = [];
  category: string | null = null;
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
    // Nos aseguramos de cancelar la suscripción cuando el componente se destruya
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  goToProductDetail(product: any): void {
    this.router.navigate(['/product-detail'], {
      state: { product, category: this.category }
    });
  }

  //Si existe una categoria, filtra esa categoria, si no, filtra todos los productos
  listProducts(): void {
    this.spinnerService.showSpinner();
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe({
        next: (data) => {
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
          this.products = data;
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
    }
  }
}
