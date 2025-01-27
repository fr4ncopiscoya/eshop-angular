import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/cart--services/cart.service';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product: any;
  category: string | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private spinnerService: SpinnerService
  ) { }

  goBackToCategory(): void {
    if (this.category) {
      this.router.navigate(['/'], { queryParams: { category: this.category } });
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    // Recuperamos los datos del producto y la categoría desde el estado de la navegación
    const navigation = history.state;
    this.spinnerService.showSpinner();
    if (navigation) {
      this.spinnerService.hideSpinner();
      this.product = navigation.product;
      this.category = navigation.category;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
