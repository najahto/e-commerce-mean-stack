import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '@frontend/admin/environments';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(
    category: Category
  ): Observable<{ success: boolean; message: string; category: Category }> {
    return this.http.post<{
      success: boolean;
      message: string;
      category: Category;
    }>(`${this.baseUrl}/categories`, category);
  }

  findCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  editCategory(
    id: string,
    category: Category
  ): Observable<{ success: boolean; message: string; category: Category }> {
    return this.http.put<{
      success: boolean;
      message: string;
      category: Category;
    }>(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(
    id: string
  ): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.baseUrl}/categories/${id}`
    );
  }
}
