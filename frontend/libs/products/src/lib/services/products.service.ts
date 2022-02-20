import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from '@frontend/admin/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, productData);
  }

  findProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  editProduct(id: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/products/${id}`,
      productData
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }
}
