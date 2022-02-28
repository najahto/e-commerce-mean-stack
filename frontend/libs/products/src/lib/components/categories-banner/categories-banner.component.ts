import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss'],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  constructor(private categoriesService: CategoriesService) {}

  categories: Category[] = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
  }
}
