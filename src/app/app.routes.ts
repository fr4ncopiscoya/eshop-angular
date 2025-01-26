import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products--components/product-list/product-list.component';
import { ProductCategoryComponent } from './products/products--components/product-category/product-category.component';

export const routes: Routes = [

  { path: 'category/:categoryName', component: ProductCategoryComponent },
  { path: '', component: ProductsListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
