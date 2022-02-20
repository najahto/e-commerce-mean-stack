import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '@frontend/admin/environments';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    console.log("🚀 ~ file: users.service.ts ~ line 19 ~ UsersService ~ createUser ~ user", user)
    return this.http.post<User>(`${this.baseUrl}/users/register`, user);
  }

  findUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  editUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`);
  }
}
