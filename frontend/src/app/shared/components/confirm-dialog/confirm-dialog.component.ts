import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="confirm-body">
        <div class="confirm-icon">
          <mat-icon>warning_amber</mat-icon>
        </div>
        <div class="confirm-text">
          <h2>{{ data.title }}</h2>
          <p>{{ data.message }}</p>
        </div>
      </div>
      <div class="confirm-actions">
        <button mat-stroked-button (click)="dialogRef.close(false)">
          {{ data.cancelLabel ?? 'Cancel' }}
        </button>
        <button mat-flat-button color="warn" (click)="dialogRef.close(true)">
          {{ data.confirmLabel ?? 'Delete' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog { padding: 1.5rem; min-width: 320px; max-width: 420px; }
    .confirm-body { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; }
    .confirm-icon {
      width: 40px; height: 40px; border-radius: 50%;
      background: #fef2f2; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .confirm-icon mat-icon { color: #ef4444; font-size: 20px; width: 20px; height: 20px; }
    .confirm-text h2 { font-size: 1rem; font-weight: 600; color: #1e293b; margin: 0 0 .35rem; }
    .confirm-text p  { font-size: .875rem; color: #64748b; margin: 0; line-height: 1.5; }
    .confirm-actions { display: flex; justify-content: flex-end; gap: .75rem; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}
