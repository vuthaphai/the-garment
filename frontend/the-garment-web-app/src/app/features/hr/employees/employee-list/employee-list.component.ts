import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Employee } from '@core/models/hr.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatPaginatorModule, MatDialogModule, MatTooltipModule, MatChipsModule
  ],
  template: `
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Employee Information</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>person_add</mat-icon> Add Employee
        </button>
      </div>

      <!-- Filters -->
      <div class="card filter-bar">
        <mat-form-field appearance="outline" style="max-width:280px">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="searchText" (keyup.enter)="load(0)"
                 placeholder="Card no, name..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline" style="width:150px">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="activeFilter" (selectionChange)="load(0)">
            <mat-option [value]="undefined">All</mat-option>
            <mat-option [value]="true">Active</mat-option>
            <mat-option [value]="false">Resigned</mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-stroked-button (click)="load(0)">
          <mat-icon>refresh</mat-icon> Refresh
        </button>
      </div>

      <!-- Table -->
      <div class="card-table">
        <table mat-table [dataSource]="employees()" class="w-full">
          <ng-container matColumnDef="empCardNo">
            <th mat-header-cell *matHeaderCellDef>Card No</th>
            <td mat-cell *matCellDef="let row" class="font-mono font-medium text-indigo-700">
              {{ row.empCardNo }}
            </td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row">
              <div class="font-medium text-slate-800">{{ row.nativeName }}</div>
              <div class="text-xs text-slate-500">{{ row.foreignName }}</div>
            </td>
          </ng-container>
          <ng-container matColumnDef="groupPosition">
            <th mat-header-cell *matHeaderCellDef>Group / Position</th>
            <td mat-cell *matCellDef="let row">
              <div class="text-sm">{{ row.groupPositionName || '—' }}</div>
            </td>
          </ng-container>
          <ng-container matColumnDef="dateJoined">
            <th mat-header-cell *matHeaderCellDef>Date Joined</th>
            <td mat-cell *matCellDef="let row">{{ row.dateJoined | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="salary">
            <th mat-header-cell *matHeaderCellDef>Salary</th>
            <td mat-cell *matCellDef="let row">
              {{ row.currency }}{{ row.salary | number:'1.2-2' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row">
              <span [class]="row.active ? 'badge-green' : 'badge-red'">
                {{ row.active ? 'Active' : 'Resigned' }}
              </span>
            </td>
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
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        @if (employees().length === 0) {
          <div class="empty-state">No employees found</div>
        }
        <mat-paginator
          [length]="totalElements()"
          [pageSize]="pageSize"
          [pageSizeOptions]="[10, 20, 50]"
          (page)="onPage($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>
    </div>
  `,
  styles: []
})
export class EmployeeListComponent implements OnInit {
  columns = ['empCardNo', 'name', 'groupPosition', 'dateJoined', 'salary', 'status', 'actions'];
  employees = signal<Employee[]>([]);
  totalElements = signal(0);
  searchText = '';
  activeFilter: boolean | undefined = undefined;
  pageSize = 20;

  constructor(
    private hrService: HrService,
    private notify: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.load(0); }

  load(page: number) {
    this.hrService.getEmployees(this.searchText, this.activeFilter, page, this.pageSize)
      .subscribe(res => {
        if (res.success) {
          this.employees.set(res.data.content ?? []);
          this.totalElements.set(res.data.totalElements ?? 0);
        }
      });
  }

  onPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.load(event.pageIndex);
  }

  openForm(emp?: Employee) {
    this.dialog.open(EmployeeFormComponent, {
      data: emp?.id ?? null, width: '960px', maxHeight: '92vh'
    }).afterClosed().subscribe((saved: boolean) => { if (saved) this.load(0); });
  }

  confirmDelete(emp: Employee) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Employee', message: `Delete "${emp.nativeName}"?` }
    }).afterClosed().subscribe((ok: boolean) => {
      if (ok && emp.id) {
        this.hrService.deleteEmployee(emp.id).subscribe({
          next: () => { this.notify.success('Deleted'); this.load(0); },
          error: () => this.notify.error('Failed')
        });
      }
    });
  }
}
