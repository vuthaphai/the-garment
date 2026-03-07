import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AttendanceService } from '@core/services/attendance.service';

@Component({
  selector: 'app-daily-attendance',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule
  ],
  template: `
    <div class="p-6">
      <h1 class="page-title">Control Daily Data</h1>

      <!-- Filters -->
      <div class="card mb-4 flex gap-4 flex-wrap items-end">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Card No</mat-label>
          <input matInput [(ngModel)]="empCardNo" placeholder="Employee card no" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-44">
          <mat-label>From Date</mat-label>
          <input matInput [matDatepicker]="fromPicker" [(ngModel)]="dateFrom" />
          <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
          <mat-datepicker #fromPicker></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-44">
          <mat-label>To Date</mat-label>
          <input matInput [matDatepicker]="toPicker" [(ngModel)]="dateTo" />
          <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
          <mat-datepicker #toPicker></mat-datepicker>
        </mat-form-field>
        <button mat-flat-button color="primary" (click)="load(0)">
          <mat-icon>search</mat-icon> Search
        </button>
      </div>

      <!-- Table -->
      <div class="card p-0 overflow-hidden overflow-x-auto">
        <table mat-table [dataSource]="rows()" class="w-full min-w-max">
          <ng-container matColumnDef="empCardNo">
            <th mat-header-cell *matHeaderCellDef>Card No</th>
            <td mat-cell *matCellDef="let row" class="font-mono text-indigo-700">{{ row.empCardNo }}</td>
          </ng-container>
          <ng-container matColumnDef="scanDate">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let row">{{ row.scanDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="t1">
            <th mat-header-cell *matHeaderCellDef>T1</th>
            <td mat-cell *matCellDef="let row" class="text-sm">{{ row.t1 || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="t2">
            <th mat-header-cell *matHeaderCellDef>T2</th>
            <td mat-cell *matCellDef="let row" class="text-sm">{{ row.t2 || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="workingHours">
            <th mat-header-cell *matHeaderCellDef>Work Hrs</th>
            <td mat-cell *matCellDef="let row">{{ row.workingHours }}</td>
          </ng-container>
          <ng-container matColumnDef="ot1">
            <th mat-header-cell *matHeaderCellDef>OT1</th>
            <td mat-cell *matCellDef="let row">{{ row.ot1 || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="ot2">
            <th mat-header-cell *matHeaderCellDef>OT2</th>
            <td mat-cell *matCellDef="let row">{{ row.ot2 || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="workDayType">
            <th mat-header-cell *matHeaderCellDef>Day Type</th>
            <td mat-cell *matCellDef="let row">{{ row.workDayType || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="leaveType">
            <th mat-header-cell *matHeaderCellDef>Leave</th>
            <td mat-cell *matCellDef="let row">{{ row.leaveType || '—' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns" class="bg-slate-50"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-slate-50"></tr>
        </table>
        @if (rows().length === 0) {
          <div class="text-center py-12 text-slate-400">No attendance records. Apply filters and search.</div>
        }
        <mat-paginator
          [length]="total()"
          [pageSize]="50"
          (page)="onPage($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>
    </div>
  `
})
export class DailyAttendanceComponent {
  columns = ['empCardNo', 'scanDate', 't1', 't2', 'workingHours', 'ot1', 'ot2', 'workDayType', 'leaveType'];
  rows = signal<any[]>([]);
  total = signal(0);
  empCardNo = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  constructor(private svc: AttendanceService) {}

  load(page: number) {
    const fmt = (d: Date | null) => d ? d.toISOString().split('T')[0] : undefined;
    this.svc.getDailyAttendance(
      this.empCardNo || undefined,
      fmt(this.dateFrom), fmt(this.dateTo), page
    ).subscribe(res => {
      if (res.success) {
        this.rows.set(res.data.content ?? []);
        this.total.set(res.data.totalElements ?? 0);
      }
    });
  }

  onPage(event: PageEvent) { this.load(event.pageIndex); }
}
