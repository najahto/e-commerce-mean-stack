import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { map, Observable } from 'rxjs';
import { environment } from '@frontend/admin/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  findOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }

  editOrder(id: string, orderStatus: { status: string }): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}`, orderStatus);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/orders/${id}`);
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/orders/get/totalSales`)
      .pipe(map((objectValue: any) => objectValue.totalSales));
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/orders/get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }
}
