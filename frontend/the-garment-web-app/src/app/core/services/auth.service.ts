import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CurrentUserResponse, LoginRequest, LoginResponse, UserInfo } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tg_token';
  private readonly USER_KEY = 'tg_user';

  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  private _user = signal<UserInfo | null>(this.loadUser());

  readonly isAuthenticated = computed(() => !!this._token());
  readonly currentUser = computed(() => this._user());
  readonly token = computed(() => this._token());

  constructor(private http: HttpClient, private router: Router) {
    if (this._token() && !this._user()) {
      this.refreshCurrentUser().subscribe();
    }
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`, request
    ).pipe(
      tap(data => {
        localStorage.setItem(this.TOKEN_KEY, data.accessToken);
        const user: UserInfo = {
          username: data.username,
          fullName: data.fullName || data.username,
          role: data.role,
          roles: data.roles ?? [data.role]
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this._token.set(data.accessToken);
        this._user.set(user);
      })
    );
  }

  logout() {
    return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {}).pipe(
      catchError(() => of(void 0)),
      tap(() => this.clearSession())
    );
  }

  refreshCurrentUser(): Observable<UserInfo> {
    return this.http.get<CurrentUserResponse>(`${environment.apiUrl}/auth/me`).pipe(
      map(currentUser => ({
        username: currentUser.username,
        fullName: currentUser.username,
        role: currentUser.roles?.[0] ?? 'USER',
        roles: currentUser.roles ?? []
      })),
      tap(user => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this._user.set(user);
      })
    );
  }

  private clearSession() {
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
