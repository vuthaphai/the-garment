import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AttendanceService } from '@core/services/attendance.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Shift Management</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Shift
        </button>
      </div>

      <div class="card mb-4">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="search" (keyup.enter)="load()" placeholder="Shift name..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="shifts()" class="w-full">
          <ng-container matColumnDef="no">
            <th mat-header-cell *matHeaderCellDef class="w-12">#</th>
            <td mat-cell *matCellDef="let row; let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="nativeName">
            <th mat-header-cell *matHeaderCellDef>Native Name</th>
            <td mat-cell *matCellDef="let row" class="font-medium">{{ row.nativeName }}</td>
          </ng-container>
          <ng-container matColumnDef="foreignName">
            <th mat-header-cell *matHeaderCellDef>Foreign Name</th>
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="firstPeriod">
            <th mat-header-cell *matHeaderCellDef>Work Period</th>
            <td mat-cell *matCellDef="let row">
              {{ row.firstStart | date:'HH:mm':'UTC' }} – {{ row.firstEnd | date:'HH:mm':'UTC' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="ot1Rate">
            <th mat-header-cell *matHeaderCellDef>OT1 %</th>
            <td mat-cell *matCellDef="let row">{{ row.ot1Rate }}%</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="w-24">Actions</th>
            <td mat-cell *matCellDef="let row">
              <button mat-icon-button matTooltip="Edit" (click)="openForm(row)">
                <mat-icon class="text-slate-500">edit</mat-icon>
              </button>
              <button mat-icon-button matTooltip="Delete" (click)="confirmDelete(row)">
                <mat-icon class="text-red-400">delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns" class="bg-slate-50"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-slate-50"></tr>
        </table>
        @if (shifts().length === 0) {
          <div class="text-center py-12 text-slate-400">No shifts found</div>
        }
      </div>

      <!-- Inline quick form placeholder -->
    </div>
  `
})
export class ShiftListComponent implements OnInit {
  columns = ['no', 'nativeName', 'foreignName', 'firstPeriod', 'ot1Rate', 'actions'];
  shifts = signal<any[]>([]);
  search = '';

  constructor(
    private svc: AttendanceService,
    private notify: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.svc.getShifts(this.search).subscribe(res => {
      if (res.success) this.shifts.set(res.data);
    });
  }

  openForm(shift?: any) {
    // Full shift form is complex; open in dialog (simplified version shows key fields)
    this.notify.success('Shift form – coming soon (edit in API)');
  }

  confirmDelete(shift: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Shift', message: `Delete "${shift.nativeName}"?` }
    }).afterClosed().subscribe(ok => {
      if (ok) this.svc.deleteShift(shift.id).subscribe({
        next: () => { this.notify.success('Deleted'); this.load(); },
        error: () => this.notify.error('Failed')
      });
    });
  }
}
