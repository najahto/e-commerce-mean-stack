import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../apps/e-commerce/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category);
  }

  deleteCategory(id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.baseUrl}/categories/${id}`);
  }
}
