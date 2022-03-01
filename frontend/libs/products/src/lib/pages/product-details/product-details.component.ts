import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  ensSubscription$: Subject<boolean> = new Subject<boolean>();
  quantity = 0;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) this._getProduct(params['id']);
      },
    });
  }

  addProductToCart() {}

  private _getProduct(id: string) {
    this.productsService
      .findProduct(id)
      .pipe(takeUntil(this.ensSubscription$))
      .subscribe({
        next: (product) => {
          this.product = product;
        },
      });
  }

  ngOnDestroy(): void {
    this.ensSubscription$.next(true);
    this.ensSubscription$.complete();
  }
}
