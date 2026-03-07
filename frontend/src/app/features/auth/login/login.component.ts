import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-shell">
      <!-- Left panel — branding -->
      <div class="login-brand">
        <div class="login-brand-inner">
          <div class="brand-icon">
            <mat-icon>factory</mat-icon>
          </div>
          <h1>The Garment</h1>
          <p>Streamline HR, Time Attendance &amp; Payroll with a single platform built for garment manufacturers.</p>
          <ul class="brand-features">
            <li><mat-icon>check_circle</mat-icon> Employee lifecycle management</li>
            <li><mat-icon>check_circle</mat-icon> Biometric attendance tracking</li>
            <li><mat-icon>check_circle</mat-icon> Automated payroll processing</li>
          </ul>
        </div>
      </div>

      <!-- Right panel — form -->
      <div class="login-form-panel">
        <div class="login-card">
          <div class="login-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          @if (error()) {
            <div class="login-error">
              <mat-icon>error_outline</mat-icon>
              {{ error() }}
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" autocomplete="username" />
              <mat-icon matPrefix>person_outline</mat-icon>
              @if (form.get('username')?.invalid && form.get('username')?.touched) {
                <mat-error>Username is required</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="showPassword() ? 'text' : 'password'"
                     formControlName="password" autocomplete="current-password" />
              <mat-icon matPrefix>lock_outline</mat-icon>
              <button mat-icon-button matSuffix type="button"
                      (click)="showPassword.set(!showPassword())">
                <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (form.get('password')?.invalid && form.get('password')?.touched) {
                <mat-error>Password is required</mat-error>
              }
            </mat-form-field>

            <button mat-flat-button type="submit"
                    [disabled]="loading()"
                    class="login-btn">
              @if (loading()) {
                <mat-spinner diameter="18"></mat-spinner>
                Signing in…
              } @else {
                Sign In
              }
            </button>
          </form>

          <p class="login-footer">&copy; {{ year }} The Garment</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-shell {
      display: flex;
      min-height: 100vh;
    }

    /* ── Brand Panel ── */
    .login-brand {
      display: none;
      flex: 1;
      background: linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
      padding: 3rem;
      position: relative;
      overflow: hidden;
    }
    .login-brand::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .login-brand-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      max-width: 380px;
    }
    .brand-icon {
      width: 64px;
      height: 64px;
      background: rgba(255,255,255,.15);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,.2);
    }
    .brand-icon mat-icon {
      color: white;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .login-brand h1 {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0 0 .75rem;
      letter-spacing: -.025em;
    }
    .login-brand p {
      color: rgba(255,255,255,.7);
      font-size: 1rem;
      line-height: 1.6;
      margin: 0 0 2rem;
    }
    .brand-features {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: .75rem;
    }
    .brand-features li {
      display: flex;
      align-items: center;
      gap: .6rem;
      color: rgba(255,255,255,.85);
      font-size: .9rem;
    }
    .brand-features mat-icon {
      color: #a5b4fc;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    /* ── Form Panel ── */
    .login-form-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1.5rem;
      background: #f8fafc;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 4px 24px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04);
    }
    .login-card-header {
      margin-bottom: 2rem;
    }
    .login-card-header h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 .35rem;
      letter-spacing: -.02em;
    }
    .login-card-header p {
      color: #64748b;
      margin: 0;
      font-size: .9rem;
    }
    .login-error {
      display: flex;
      align-items: center;
      gap: .5rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      border-radius: 10px;
      padding: .75rem 1rem;
      font-size: .85rem;
      margin-bottom: 1.25rem;
    }
    .login-error mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: .25rem;
    }
    .login-btn {
      width: 100%;
      height: 48px;
      font-size: .95rem;
      font-weight: 600;
      border-radius: 10px !important;
      background: #6366f1 !important;
      color: white !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      margin-top: .5rem;
    }
    .login-btn:disabled { opacity: .6; }
    .login-footer {
      text-align: center;
      color: #94a3b8;
      font-size: .75rem;
      margin: 1.5rem 0 0;
    }

    @media (min-width: 900px) {
      .login-brand { display: flex; }
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);
  year = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Invalid username or password');
      }
    });
  }
}
