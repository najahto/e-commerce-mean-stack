import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  category: Category;
  ensSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this._getCategory(params['id']);
          this._geProducts(params['id']);
        }
      },
    });
  }

  private _getCategory(id: string) {
    this.categoriesService
      .findCategory(id)
      .pipe(takeUntil(this.ensSubscription$))
      .subscribe({
        next: (category) => {
          this.category = category;
        },
      });
  }

  private _geProducts(category: string) {
    this.productsService
      .getProducts([category])
      .pipe(takeUntil(this.ensSubscription$))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
      });
  }

  ngOnDestroy(): void {
    this.ensSubscription$.next(true);
    this.ensSubscription$.complete();
  }
}
