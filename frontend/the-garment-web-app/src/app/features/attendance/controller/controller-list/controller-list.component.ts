import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AttendanceService } from '@core/services/attendance.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-controller-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatExpansionModule, MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Fingerprint Devices</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Device
        </button>
      </div>

      <div class="space-y-4">
        @for (ctrl of controllers(); track ctrl.id) {
          <mat-expansion-panel class="card p-0! overflow-hidden">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="mr-2 text-indigo-500">router</mat-icon>
                {{ ctrl.machineName || ctrl.name || ('Device #' + ctrl.id) }}
              </mat-panel-title>
              <mat-panel-description>{{ ctrl.location || ctrl.ipAddress || 'Fingerprint reader' }}</mat-panel-description>
            </mat-expansion-panel-header>

            <div class="px-4 pb-4">
              <div class="bg-slate-50 rounded-lg overflow-hidden">
                <table mat-table [dataSource]="[ctrl]" class="w-full">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Machine Name</th>
                    <td mat-cell *matCellDef="let m">{{ m.machineName || m.name || 'Unnamed device' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="ip">
                    <th mat-header-cell *matHeaderCellDef>IP Address</th>
                    <td mat-cell *matCellDef="let m" class="font-mono">{{ m.ipAddress || 'N/A' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="type">
                    <th mat-header-cell *matHeaderCellDef>Type</th>
                    <td mat-cell *matCellDef="let m">{{ m.machineType || m.status || 'Unknown' }}</td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="machineCols"></tr>
                  <tr mat-row *matRowDef="let row; columns: machineCols;"></tr>
                </table>
              </div>

              <div class="flex gap-2 mt-3">
                <button mat-stroked-button color="primary" (click)="downloadData(ctrl)">
                  <mat-icon>cloud_download</mat-icon> Download Data
                </button>
                <button mat-stroked-button (click)="editController(ctrl)">
                  <mat-icon>edit</mat-icon> Edit
                </button>
                <button mat-stroked-button color="warn" (click)="confirmDelete(ctrl)">
                  <mat-icon>delete</mat-icon> Delete
                </button>
              </div>
            </div>
          </mat-expansion-panel>
        }
        @if (controllers().length === 0) {
          <div class="card text-center text-slate-400 py-12">No fingerprint devices configured</div>
        }
      </div>
    </div>
  `
})
export class ControllerListComponent implements OnInit {
  machineCols = ['name', 'ip', 'type'];
  controllers = signal<any[]>([]);

  constructor(
    private svc: AttendanceService,
    private notify: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.svc.getFingerPrinters().subscribe(res => {
      this.controllers.set(res);
    });
  }

  openForm() { this.notify.success('Device form is not wired yet. Use the API for create/update for now.'); }
  editController(ctrl: any) { this.notify.success('Edit: ' + (ctrl.machineName || ctrl.name || ctrl.id)); }

  downloadData(ctrl: any) {
    this.svc.downloadAttendanceData().subscribe({
      next: res => this.notify.success(res ?? 'Download initiated'),
      error: () => this.notify.error('Download failed')
    });
  }

  confirmDelete(ctrl: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Device', message: `Delete "${ctrl.machineName || ctrl.name || ctrl.id}"?` }
    }).afterClosed().subscribe(ok => {
      if (ok) this.svc.deleteFingerPrinter(ctrl.id).subscribe({
        next: () => { this.notify.success('Deleted'); this.load(); },
        error: () => this.notify.error('Failed')
      });
    });
  }
}
