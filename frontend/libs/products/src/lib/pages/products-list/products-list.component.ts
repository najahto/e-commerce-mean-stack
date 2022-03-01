import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];

  ensSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._geProducts();
    this._geCategories();
  }

  ngOnDestroy(): void {
    this.ensSubscription$.next(true);
    this.ensSubscription$.complete();
  }

  filterByCategory() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._geProducts(selectedCategories);
  }

  private _geCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.ensSubscription$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
  }
  private _geProducts(categoriesFilter?: any) {
    this.productsService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.ensSubscription$))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
      });
  }
}
