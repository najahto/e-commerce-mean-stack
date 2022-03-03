import { Injectable } from '@angular/core';

const TOKEN = 'Token';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
