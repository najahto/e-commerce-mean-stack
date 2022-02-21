import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
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

  editOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/orders/${id}`, order);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/orders/${id}`);
  }
}
