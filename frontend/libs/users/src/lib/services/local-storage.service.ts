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

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    console.log("🚀 ~ file: local-storage.service.ts ~ line 19 ~ LocalStorageService ~ removeToken ~ removeToken")
    localStorage.removeItem(TOKEN);
  }
}
