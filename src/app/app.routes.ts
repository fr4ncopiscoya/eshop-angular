import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products--components/product-list/product-list.component';
import { ProductDetailComponent } from './products/products--components/product-detail/product-detail.component';

export const routes: Routes = [

  { path: 'product--detail', component: ProductDetailComponent },
  { path: '', component: ProductsListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
