import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AttendanceService } from '@core/services/attendance.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatSelectModule, MatProgressBarModule
  ],
  template: `
    <div class="p-6">
      <h1 class="page-title">Download Data</h1>
      <p class="text-slate-500 mb-6 text-sm">
        Download attendance scan data from biometric controllers over the network.
      </p>

      <div class="card max-w-md">
        <h3 class="text-base font-semibold mb-4 text-slate-700">Download from Controller</h3>

        <mat-form-field appearance="outline">
          <mat-label>Select Controller</mat-label>
          <mat-select [(ngModel)]="selectedId">
            @for (c of controllers(); track c.id) {
              <mat-option [value]="c.id">{{ c.controllerName }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        @if (downloading()) {
          <mat-progress-bar mode="indeterminate" class="my-4"></mat-progress-bar>
          <p class="text-sm text-slate-500 animate-pulse">Downloading data from machine...</p>
        }

        <div class="flex gap-3 mt-4">
          <button mat-flat-button color="primary"
                  [disabled]="!selectedId || downloading()"
                  (click)="download()">
            <mat-icon>cloud_download</mat-icon>
            Download
          </button>
          <button mat-stroked-button (click)="loadControllers()">
            <mat-icon>refresh</mat-icon> Refresh
          </button>
        </div>

        @if (lastResult()) {
          <div class="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            <mat-icon class="align-middle mr-1">check_circle</mat-icon>
            {{ lastResult() }}
          </div>
        }
      </div>
    </div>
  `
})
export class DownloadComponent {
  controllers = signal<any[]>([]);
  selectedId: number | null = null;
  downloading = signal(false);
  lastResult = signal('');

  constructor(
    private svc: AttendanceService,
    private notify: NotificationService
  ) {
    this.loadControllers();
  }

  loadControllers() {
    this.svc.getControllers().subscribe(res => {
      if (res.success) this.controllers.set(res.data);
    });
  }

  download() {
    if (!this.selectedId) return;
    this.downloading.set(true);
    this.lastResult.set('');
    this.svc.downloadData(this.selectedId).subscribe({
      next: res => {
        this.downloading.set(false);
        this.lastResult.set(res.data ?? 'Download initiated successfully');
        this.notify.success('Download initiated');
      },
      error: () => {
        this.downloading.set(false);
        this.notify.error('Download failed — check machine connectivity');
      }
    });
  }
}
