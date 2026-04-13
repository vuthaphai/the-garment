import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { GroupPosition } from '@core/models/hr.model';
import { GroupPositionFormComponent } from '../group-position-form/group-position-form.component';

@Component({
  selector: 'app-group-position-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Group Position</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Group Position
        </button>
      </div>

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="items()" class="w-full">
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
          <ng-container matColumnDef="annualLeave">
            <th mat-header-cell *matHeaderCellDef>Annual Leave (days)</th>
            <td mat-cell *matCellDef="let row">{{ row.annualLeaveDayAllowed ?? 0 }}</td>
          </ng-container>
          <ng-container matColumnDef="ot">
            <th mat-header-cell *matHeaderCellDef>OT</th>
            <td mat-cell *matCellDef="let row">
              @if (row.ot1) { <span class="badge-blue mr-1">OT1</span> }
              @if (row.ot2) { <span class="badge-blue mr-1">OT2</span> }
              @if (row.ot3) { <span class="badge-blue mr-1">OT3</span> }
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
          <tr mat-header-row *matHeaderRowDef="columns" class="bg-slate-50"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-slate-50"></tr>
        </table>
        @if (items().length === 0) {
          <div class="text-center py-12 text-slate-400">No group positions found</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .badge-blue { display:inline-flex;align-items:center;padding:.2rem .65rem;border-radius:99px;font-size:.7rem;font-weight:600;background:#e0e7ff;color:#3730a3; }
  `]
})
export class GroupPositionListComponent implements OnInit {
  columns = ['no', 'nativeName', 'foreignName', 'annualLeave', 'ot', 'actions'];
  items = signal<GroupPosition[]>([]);

  constructor(
    private hrService: HrService,
    private notify: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.load(); }
  load() { this.hrService.getGroupPositions().subscribe(res => { if (res.success) this.items.set(res.data); }); }

  openForm(item?: GroupPosition) {
    this.dialog.open(GroupPositionFormComponent, {
      data: item ? item.id : null,
      width: '900px',
      maxHeight: '90vh'
    }).afterClosed().subscribe(saved => { if (saved) this.load(); });
  }

  confirmDelete(item: GroupPosition) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Group Position', message: `Delete "${item.nativeName}"?` } })
      .afterClosed().subscribe(ok => {
        if (ok && item.id) this.hrService.deleteGroupPosition(item.id).subscribe({
          next: () => { this.notify.success('Deleted'); this.load(); },
          error: () => this.notify.error('Failed')
        });
      });
  }
}
