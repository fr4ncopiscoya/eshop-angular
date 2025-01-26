import { Component } from '@angular/core';
import { ProductService } from '../../products/products--services/product.service';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from '../../cart/cart--components/cart-button/cart-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, CartButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isModalOpen = false;
  categories: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listCategories();
  }


  listCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (data: any) => {
        console.log('categories: ', data)
        this.categories = data;
      },
      error: (error: any) => {
        console.log('Error: ', error);
      },
    });
  }
  // Abre el modal al hacer clic en el cart-button
  openCartPopup() {
    this.isModalOpen = !this.isModalOpen;
  }
}
