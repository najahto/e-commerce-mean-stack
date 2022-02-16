import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe(
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
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
