import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceService } from '@core/services/attendance.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="report-shell">
      <div class="report-header">
        <div>
          <h2>Attendance Summary</h2>
          <p>Live response from the new BFF report endpoint.</p>
        </div>
        <button class="refresh-btn" type="button" (click)="load()">Refresh</button>
      </div>

      <div class="report-card">
        <div class="coming-soon-icon">
          <mat-icon>bar_chart</mat-icon>
        </div>
        @if (report()) {
          <pre>{{ report() | json }}</pre>
        } @else {
          <p>No report data loaded yet.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .report-shell {
      display: grid;
      gap: 1rem;
    }
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .report-header h2 { font-size: 1.5rem; font-weight: 600; color: #475569; margin: 0; }
    .report-header p { margin: .25rem 0 0; color: #64748b; }
    .report-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.5rem;
      color: #475569;
    }
    .coming-soon-icon {
      width: 80px; height: 80px; border-radius: 24px;
      background: #f1f5f9; display: flex; align-items: center; justify-content: center;
      margin-bottom: 1rem;
    }
    .coming-soon-icon mat-icon { font-size: 40px; width: 40px; height: 40px; color: #94a3b8; }
    .refresh-btn {
      border: 0;
      border-radius: 999px;
      padding: .6rem 1rem;
      background: #0f172a;
      color: white;
      cursor: pointer;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: .875rem;
    }
  `]
})
export class ReportsComponent {
  report = signal<any>(null);

  constructor(private attendanceService: AttendanceService) {
    this.load();
  }

  load() {
    this.attendanceService.getAttendanceSummaryReport().subscribe(data => {
      this.report.set(data);
    });
  }
}
