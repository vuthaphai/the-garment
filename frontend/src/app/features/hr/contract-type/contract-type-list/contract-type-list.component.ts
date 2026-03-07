import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ContractType } from '@core/models/hr.model';

@Component({
  selector: 'app-contract-type-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule,
    MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Type of Contract</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Contract Type
        </button>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4 text-slate-700">
            {{ editingId() ? 'Edit' : 'Add' }} Contract Type
          </h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="grid grid-cols-2 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Contract Name *</mat-label>
              <input matInput formControlName="contractName" />
              @if (form.get('contractName')?.invalid && form.get('contractName')?.touched) {
                <mat-error>Required</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Auto Rule</mat-label>
              <input matInput formControlName="autoRule" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Duration (months)</mat-label>
              <input matInput type="number" formControlName="duration" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Warning (days before)</mat-label>
              <input matInput type="number" formControlName="warning" />
            </mat-form-field>
            <div class="flex items-center">
              <mat-checkbox formControlName="isAuto">Auto renew</mat-checkbox>
            </div>
            <div class="col-span-2 flex gap-2 justify-end">
              <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
              <button mat-flat-button color="primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      }

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="items()" class="w-full">
          <ng-container matColumnDef="no">
            <th mat-header-cell *matHeaderCellDef class="w-12">#</th>
            <td mat-cell *matCellDef="let row; let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="contractName">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row" class="font-medium">{{ row.contractName }}</td>
          </ng-container>
          <ng-container matColumnDef="autoRule">
            <th mat-header-cell *matHeaderCellDef>Auto Rule</th>
            <td mat-cell *matCellDef="let row">{{ row.autoRule || '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="duration">
            <th mat-header-cell *matHeaderCellDef>Duration</th>
            <td mat-cell *matCellDef="let row">{{ row.duration ? row.duration + ' months' : '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="warning">
            <th mat-header-cell *matHeaderCellDef>Warning</th>
            <td mat-cell *matCellDef="let row">{{ row.warning ? row.warning + ' days' : '—' }}</td>
          </ng-container>
          <ng-container matColumnDef="isAuto">
            <th mat-header-cell *matHeaderCellDef>Auto</th>
            <td mat-cell *matCellDef="let row">
              <mat-icon [class]="row.isAuto ? 'text-green-500' : 'text-slate-300'">
                {{ row.isAuto ? 'check_circle' : 'cancel' }}
              </mat-icon>
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
          <div class="text-center py-12 text-slate-400">No contract types found</div>
        }
      </div>
    </div>
  `
})
export class ContractTypeListComponent implements OnInit {
  columns = ['no', 'contractName', 'autoRule', 'duration', 'warning', 'isAuto', 'actions'];
  items = signal<ContractType[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  form: FormGroup;

  constructor(
    private hrService: HrService, private notify: NotificationService,
    private dialog: MatDialog, private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      contractName: ['', Validators.required],
      autoRule: [''], duration: [null], warning: [null], isAuto: [false]
    });
  }

  ngOnInit() { this.load(); }
  load() { this.hrService.getContractTypes().subscribe(res => { if (res.success) this.items.set(res.data); }); }

  openForm(item?: ContractType) {
    this.showForm.set(true); this.editingId.set(item?.id ?? null);
    this.form.reset({ contractName: item?.contractName ?? '', autoRule: item?.autoRule ?? '',
      duration: item?.duration ?? null, warning: item?.warning ?? null, isAuto: item?.isAuto ?? false });
  }

  cancel() { this.showForm.set(false); this.editingId.set(null); this.form.reset(); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.editingId();
    const action = id ? this.hrService.updateContractType(id, this.form.value) : this.hrService.createContractType(this.form.value);
    action.subscribe({ next: () => { this.notify.success('Saved'); this.cancel(); this.load(); }, error: () => this.notify.error('Failed') });
  }

  confirmDelete(item: ContractType) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete', message: `Delete "${item.contractName}"?` } })
      .afterClosed().subscribe(ok => {
        if (ok && item.id) this.hrService.deleteContractType(item.id).subscribe({ next: () => { this.notify.success('Deleted'); this.load(); }, error: () => this.notify.error('Failed') });
      });
  }
}
