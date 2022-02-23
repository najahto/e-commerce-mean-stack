import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  updateCategory(id: string) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService
          .deleteCategory(id)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
            (res) => {
              this._getCategories();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Category deleted',
              });
              console.log('response', res);
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not deleted!',
              });
              console.log('error', error);
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'You have cancelled',
        });
      },
    });
  }

  confirmDelete() {}

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((data) => {
        this.categories = data;
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
