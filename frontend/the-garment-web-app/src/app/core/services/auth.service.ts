import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, LoginRequest, LoginResponse, UserInfo } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tg_token';
  private readonly USER_KEY = 'tg_user';

  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  private _user = signal<UserInfo | null>(this.loadUser());

  readonly isAuthenticated = computed(() => !!this._token());
  readonly currentUser = computed(() => this._user());
  readonly token = computed(() => this._token());

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`, request
    ).pipe(
      tap(res => {
        if (res.success) {
          const data = res.data;
          localStorage.setItem(this.TOKEN_KEY, data.token);
          const user: UserInfo = {
            userId: data.userId,
            username: data.username,
            fullName: data.fullName,
            role: data.role
          };
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this._token.set(data.token);
          this._user.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  private loadUser(): UserInfo | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
}
