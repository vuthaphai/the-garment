import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsService } from '@core/services/settings.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Holiday List</h1>
        <div class="flex gap-2">
          <mat-form-field appearance="outline" class="w-28">
            <mat-label>Year</mat-label>
            <mat-select [(ngModel)]="selectedYear" (selectionChange)="load()">
              @for (y of years; track y) {
                <mat-option [value]="y">{{ y }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <button mat-flat-button color="primary" (click)="openForm()">
            <mat-icon>add</mat-icon> Add Holiday
          </button>
        </div>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4">
            {{ editingId() ? 'Edit' : 'Add' }} Holiday
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="dp" [(ngModel)]="editDate" />
              <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
              <mat-datepicker #dp></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Native Name</mat-label>
              <input matInput [(ngModel)]="editNativeName" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Foreign Name</mat-label>
              <input matInput [(ngModel)]="editForeignName" />
            </mat-form-field>
          </div>
          <div class="flex gap-2 justify-end mt-2">
            <button mat-stroked-button (click)="cancelForm()">Cancel</button>
            <button mat-flat-button color="primary" (click)="save()">Save</button>
          </div>
        </div>
      }

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="holidays()" class="w-full">
          <ng-container matColumnDef="no">
            <th mat-header-cell *matHeaderCellDef class="w-12">#</th>
            <td mat-cell *matCellDef="let row; let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="holidayDate">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let row" class="font-medium">{{ row.holidayDate | date:'dd MMMM yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="nativeName">
            <th mat-header-cell *matHeaderCellDef>Native Name</th>
            <td mat-cell *matCellDef="let row">{{ row.nativeName }}</td>
          </ng-container>
          <ng-container matColumnDef="foreignName">
            <th mat-header-cell *matHeaderCellDef>Foreign Name</th>
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '—' }}</td>
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
        @if (holidays().length === 0) {
          <div class="text-center py-12 text-slate-400">No holidays for {{ selectedYear }}</div>
        }
      </div>
    </div>
  `
})
export class HolidayListComponent implements OnInit {
  columns = ['no', 'holidayDate', 'nativeName', 'foreignName', 'actions'];
  holidays = signal<any[]>([]);
  selectedYear = new Date().getFullYear();
  years = Array.from({ length: 5 }, (_, i) => this.selectedYear - 1 + i);

  showForm = signal(false);
  editingId = signal<number | null>(null);
  editDate: Date | null = null;
  editNativeName = '';
  editForeignName = '';

  constructor(
    private svc: SettingsService,
    private notify: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.svc.getHolidays(this.selectedYear).subscribe(res => {
      if (res.success) this.holidays.set(res.data);
    });
  }

  openForm(row?: any) {
    this.showForm.set(true);
    this.editingId.set(row?.id ?? null);
    this.editDate = row?.holidayDate ? new Date(row.holidayDate) : null;
    this.editNativeName = row?.nativeName ?? '';
    this.editForeignName = row?.foreignName ?? '';
  }

  cancelForm() { this.showForm.set(false); this.editingId.set(null); }

  save() {
    const payload = {
      holidayDate: this.editDate?.toISOString().split('T')[0],
      nativeName: this.editNativeName,
      foreignName: this.editForeignName,
      year: this.editDate?.getFullYear()
    };
    const id = this.editingId();
    const action = id ? this.svc.updateHoliday(id, payload) : this.svc.createHoliday(payload);
    action.subscribe({
      next: () => { this.notify.success('Saved'); this.cancelForm(); this.load(); },
      error: () => this.notify.error('Failed')
    });
  }

  confirmDelete(row: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Holiday', message: `Delete "${row.nativeName}"?` }
    }).afterClosed().subscribe(ok => {
      if (ok) this.svc.deleteHoliday(row.id).subscribe({
        next: () => { this.notify.success('Deleted'); this.load(); },
        error: () => this.notify.error('Failed')
      });
    });
  }
}
