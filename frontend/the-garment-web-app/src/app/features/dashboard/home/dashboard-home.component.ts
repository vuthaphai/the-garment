import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { DashboardHomeResponse } from '@core/models/auth.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-shell">
      <section class="hero-card">
        <p class="eyebrow">Dashboard</p>
        <h1>Welcome back, {{ dashboard()?.username || 'User' }}</h1>
        <p class="hero-copy">The home screen is now powered by the new BFF dashboard endpoint.</p>
      </section>

      <section class="meta-grid">
        <article class="info-card">
          <h2>Roles</h2>
          <p>{{ (dashboard()?.roles || []).join(', ') || 'No roles returned' }}</p>
        </article>
        <article class="info-card">
          <h2>Widgets</h2>
          <ul>
            @for (widget of dashboard()?.widgets || []; track widget) {
              <li>{{ widget }}</li>
            }
          </ul>
        </article>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-shell {
      display: grid;
      gap: 1rem;
    }
    .hero-card {
      padding: 1.75rem;
      border-radius: 24px;
      background: linear-gradient(135deg, #0f172a, #1d4ed8);
      color: white;
      box-shadow: 0 20px 45px rgba(15, 23, 42, .18);
    }
    .eyebrow {
      margin: 0 0 .5rem;
      text-transform: uppercase;
      letter-spacing: .14em;
      font-size: .72rem;
      color: rgba(255,255,255,.7);
    }
    h1 {
      margin: 0;
      font-size: 2rem;
      line-height: 1.1;
    }
    .hero-copy {
      margin: .75rem 0 0;
      color: rgba(255,255,255,.82);
      max-width: 40rem;
    }
    .meta-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    .info-card {
      padding: 1.25rem;
      border-radius: 18px;
      background: white;
      border: 1px solid #e2e8f0;
    }
    .info-card h2 {
      margin: 0 0 .75rem;
      font-size: 1rem;
      color: #1e293b;
    }
    .info-card p,
    .info-card ul {
      margin: 0;
      color: #64748b;
    }
    .info-card ul {
      padding-left: 1rem;
    }
  `]
})
export class DashboardHomeComponent {
  dashboard = signal<DashboardHomeResponse | null>(null);

  constructor(private http: HttpClient) {
    this.http.get<DashboardHomeResponse>(`${environment.apiUrl}/dashboard/home`).subscribe(data => {
      this.dashboard.set(data);
    });
  }
}