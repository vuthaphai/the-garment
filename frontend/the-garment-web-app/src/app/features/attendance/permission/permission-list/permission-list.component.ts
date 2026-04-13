import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AttendanceService } from '@core/services/attendance.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule,
    MatPaginatorModule, MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Record Permission</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Permission
        </button>
      </div>

      <!-- Filters -->
      <div class="card mb-4 flex gap-4 flex-wrap items-end">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Card No</mat-label>
          <input matInput [(ngModel)]="empCardNo" />
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

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4">
            {{ editingId() ? 'Edit' : 'Add' }} Permission
          </h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Card No</mat-label>
              <input matInput formControlName="empCardNo" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Permission Type</mat-label>
              <mat-select formControlName="permissionType">
                <mat-option value="Annual Leave">Annual Leave</mat-option>
                <mat-option value="Sick Leave">Sick Leave</mat-option>
                <mat-option value="Maternity Leave">Maternity Leave</mat-option>
                <mat-option value="Permission">Permission</mat-option>
                <mat-option value="Other">Other</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Leave Hours</mat-label>
              <input matInput type="number" formControlName="leaveHours" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>From Date</mat-label>
              <input matInput [matDatepicker]="p1" formControlName="fromDate" />
              <mat-datepicker-toggle matSuffix [for]="p1"></mat-datepicker-toggle>
              <mat-datepicker #p1></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>To Date</mat-label>
              <input matInput [matDatepicker]="p2" formControlName="toDate" />
              <mat-datepicker-toggle matSuffix [for]="p2"></mat-datepicker-toggle>
              <mat-datepicker #p2></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <input matInput formControlName="description" />
            </mat-form-field>
            <div class="col-span-3 flex gap-2 justify-end">
              <button mat-stroked-button type="button" (click)="cancelForm()">Cancel</button>
              <button mat-flat-button color="primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      }

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="rows()" class="w-full">
          <ng-container matColumnDef="empCardNo">
            <th mat-header-cell *matHeaderCellDef>Card No</th>
            <td mat-cell *matCellDef="let row" class="font-mono">{{ row.empCardNo }}</td>
          </ng-container>
          <ng-container matColumnDef="permissionType">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let row">{{ row.permissionType }}</td>
          </ng-container>
          <ng-container matColumnDef="fromDate">
            <th mat-header-cell *matHeaderCellDef>From</th>
            <td mat-cell *matCellDef="let row">{{ row.fromDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="toDate">
            <th mat-header-cell *matHeaderCellDef>To</th>
            <td mat-cell *matCellDef="let row">{{ row.toDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="leaveHours">
            <th mat-header-cell *matHeaderCellDef>Hours</th>
            <td mat-cell *matCellDef="let row">{{ row.leaveHours }}</td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let row">{{ row.description || '—' }}</td>
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
        @if (rows().length === 0) {
          <div class="text-center py-12 text-slate-400">No records. Apply search filters above.</div>
        }
        <mat-paginator [length]="total()" [pageSize]="20" (page)="onPage($event)" showFirstLastButtons></mat-paginator>
      </div>
    </div>
  `
})
export class PermissionListComponent {
  columns = ['empCardNo', 'permissionType', 'fromDate', 'toDate', 'leaveHours', 'description', 'actions'];
  rows = signal<any[]>([]);
  total = signal(0);
  empCardNo = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  showForm = signal(false);
  editingId = signal<number | null>(null);
  form: FormGroup;

  constructor(
    private svc: AttendanceService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      empCardNo: [''], permissionType: ['Annual Leave'],
      fromDate: [null], toDate: [null],
      description: [''], leaveHours: [null]
    });
  }

  load(page: number) {
    const fmt = (d: Date | null) => d ? d.toISOString().split('T')[0] : undefined;
    this.svc.getPermissions(this.empCardNo || undefined, fmt(this.dateFrom), fmt(this.dateTo), page)
      .subscribe(res => {
        if (res.success) { this.rows.set(res.data.content ?? []); this.total.set(res.data.totalElements ?? 0); }
      });
  }

  onPage(event: PageEvent) { this.load(event.pageIndex); }

  openForm(row?: any) {
    this.showForm.set(true); this.editingId.set(row?.id ?? null);
    this.form.reset({ empCardNo: row?.empCardNo ?? '', permissionType: row?.permissionType ?? 'Annual Leave',
      fromDate: row?.fromDate ?? null, toDate: row?.toDate ?? null, description: row?.description ?? '', leaveHours: row?.leaveHours ?? null });
  }

  cancelForm() { this.showForm.set(false); this.editingId.set(null); this.form.reset(); }

  save() {
    const id = this.editingId();
    const action = id ? this.svc.updatePermission(id, this.form.value) : this.svc.createPermission(this.form.value);
    action.subscribe({ next: () => { this.notify.success('Saved'); this.cancelForm(); this.load(0); }, error: () => this.notify.error('Failed') });
  }

  confirmDelete(row: any) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Permission', message: 'Delete this permission record?' } })
      .afterClosed().subscribe(ok => {
        if (ok) this.svc.deletePermission(row.id).subscribe({ next: () => { this.notify.success('Deleted'); this.load(0); }, error: () => this.notify.error('Failed') });
      });
  }
}
