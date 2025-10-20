import { Injectable } from '@angular/core';
import { LoginResponseDto } from '../../models/LoginResponseDto';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const STORAGE_KEY = 'token_storage_type';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  saveTokens(res: LoginResponseDto, rememberMe: boolean) {
    if (!this.isBrowser()) return;

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(ACCESS_KEY, res.accessToken);
    storage.setItem(REFRESH_KEY, res.refreshToken);

    localStorage.setItem(STORAGE_KEY, rememberMe ? 'local' : 'session');
  }

  private getStorage(): Storage | null {
    if (!this.isBrowser()) return null;

    const type = localStorage.getItem(STORAGE_KEY);

    if (type === 'local') return localStorage;
    if (type === 'session') return sessionStorage;

    if (localStorage.getItem(ACCESS_KEY)) return localStorage;
    if (sessionStorage.getItem(ACCESS_KEY)) return sessionStorage;

    return null;
  }

  getAccessToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem(ACCESS_KEY) : null;
  }

  getRefreshToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem(REFRESH_KEY) : null;
  }

  clear() {
    if (!this.isBrowser()) return;

    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }

  logout() {
    this.clear(); 
  }
}
