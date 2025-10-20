import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequestDto } from '../../models/LoginRequestDto';
import { LoginResponseDto } from '../../models/LoginResponseDto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/api/account`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.base}/login-admin`, request);
  }

  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.base}/refresh-token`, {
      refreshToken: refreshToken
    });
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
