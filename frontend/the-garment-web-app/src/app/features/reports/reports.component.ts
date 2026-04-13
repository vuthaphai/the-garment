import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="coming-soon">
      <div class="coming-soon-icon">
        <mat-icon>bar_chart</mat-icon>
      </div>
      <h2>Reports</h2>
      <p>Reports &amp; analytics module — coming soon</p>
    </div>
  `,
  styles: [`
    .coming-soon {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 60vh; gap: .75rem; color: #94a3b8;
    }
    .coming-soon-icon {
      width: 80px; height: 80px; border-radius: 24px;
      background: #f1f5f9; display: flex; align-items: center; justify-content: center;
      margin-bottom: .5rem;
    }
    .coming-soon-icon mat-icon { font-size: 40px; width: 40px; height: 40px; color: #94a3b8; }
    .coming-soon h2 { font-size: 1.5rem; font-weight: 600; color: #475569; margin: 0; }
    .coming-soon p  { font-size: .95rem; margin: 0; }
  `]
})
export class ReportsComponent {}
