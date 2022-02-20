import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@frontend/products';
import { environment } from '@frontend/admin/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  host = environment.host;
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
  deleteProduct(id: string) {}

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
