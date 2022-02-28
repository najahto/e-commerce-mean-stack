import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }

  private _getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        next: (products) => {
          this.featuredProducts = products.featured;
        },
      });
  }
}
