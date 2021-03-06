import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@frontend/products';
import { environment } from '@frontend/admin/environments';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  host = environment.host;
  products: Product[] = [];
  endSubscription$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productsService
          .deleteProduct(id)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe({
            complete: () => {
              this._getProducts();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Product deleted',
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted!',
              });
            },
          });
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

  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.next(true);
    this.endSubscription$.complete();
  }
}
