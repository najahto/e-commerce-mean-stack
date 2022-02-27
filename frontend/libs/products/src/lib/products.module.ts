import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

export const productsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ProductsSearchComponent
  ],
  exports: [
    ProductsSearchComponent
  ],
})
export class ProductsModule {}
