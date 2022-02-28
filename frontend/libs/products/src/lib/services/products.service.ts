import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
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

  createProduct(productData: FormData): Observable<{
    success: boolean;
    message: string;
    product: Product;
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      product: Product;
    }>(`${this.baseUrl}/products`, productData);
  }

  findProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  editProduct(
    id: string,
    productData: FormData
  ): Observable<{
    success: boolean;
    message: string;
    product: Product;
  }> {
    return this.http.put<{
      success: boolean;
      message: string;
      product: Product;
    }>(`${this.baseUrl}/products/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/products/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }

  getFeaturedProducts(count: number): Observable<{ featured: Product[] }> {
    return this.http.get<{ featured: Product[] }>(
      `${this.baseUrl}/products/get/featured/${count}`
    );
  }
}
