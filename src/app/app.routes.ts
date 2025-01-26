import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products--components/product-list/product-list.component';

export const routes: Routes = [

  { path: '**', pathMatch: 'full', redirectTo: '' },
  { path: '', component: ProductsListComponent }
];
