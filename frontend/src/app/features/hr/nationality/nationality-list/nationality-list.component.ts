import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Nationality } from '@core/models/hr.model';

@Component({
  selector: 'app-nationality-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatTooltipModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Nationality</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Nationality
        </button>
      </div>

      <!-- Search -->
      <div class="card mb-4">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Search</mat-label>
          <input matInput (input)="onSearch($event)" placeholder="Search nationality..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <!-- Inline Form -->
      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4 text-slate-700">
            {{ editingId() ? 'Edit Nationality' : 'Add Nationality' }}
          </h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Native Name *</mat-label>
              <input matInput formControlName="nativeName" />
              @if (form.get('nativeName')?.invalid && form.get('nativeName')?.touched) {
                <mat-error>Required</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Foreign Name</mat-label>
              <input matInput formControlName="foreignName" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <input matInput formControlName="description" />
            </mat-form-field>
            <div class="col-span-3 flex gap-2 justify-end">
              <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
              <button mat-flat-button color="primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      }

      <!-- Table -->
      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="items()" class="w-full">
          <ng-container matColumnDef="no">
            <th mat-header-cell *matHeaderCellDef class="w-12">#</th>
            <td mat-cell *matCellDef="let row; let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="nativeName">
            <th mat-header-cell *matHeaderCellDef>Native Name</th>
            <td mat-cell *matCellDef="let row">{{ row.nativeName }}</td>
          </ng-container>
          <ng-container matColumnDef="foreignName">
            <th mat-header-cell *matHeaderCellDef>Foreign Name</th>
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '—' }}</td>
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
          <tr mat-row *matRowDef="let row; columns: columns;"
              class="hover:bg-slate-50 transition-colors"></tr>
        </table>
        @if (items().length === 0) {
          <div class="text-center py-12 text-slate-400">No nationalities found</div>
        }
      </div>
    </div>
  `
})
export class NationalityListComponent implements OnInit {
  columns = ['no', 'nativeName', 'foreignName', 'description', 'actions'];
  items = signal<Nationality[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  form: FormGroup;

  constructor(
    private hrService: HrService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nativeName: ['', Validators.required],
      foreignName: [''],
      description: ['']
    });
  }

  ngOnInit() { this.load(); }

  load(search?: string) {
    this.hrService.getNationalities(search).subscribe(res => {
      if (res.success) this.items.set(res.data);
    });
  }

  onSearch(event: Event) {
    this.load((event.target as HTMLInputElement).value);
  }

  openForm(item?: Nationality) {
    this.showForm.set(true);
    this.editingId.set(item?.id ?? null);
    this.form.reset({
      nativeName: item?.nativeName ?? '',
      foreignName: item?.foreignName ?? '',
      description: item?.description ?? ''
    });
  }

  cancel() {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset();
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.editingId();
    const action = id
      ? this.hrService.updateNationality(id, this.form.value)
      : this.hrService.createNationality(this.form.value);
    action.subscribe({
      next: () => { this.notify.success('Saved successfully'); this.cancel(); this.load(); },
      error: () => this.notify.error('Failed to save')
    });
  }

  confirmDelete(item: Nationality) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Nationality', message: `Delete "${item.nativeName}"?` }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed && item.id) {
        this.hrService.deleteNationality(item.id).subscribe({
          next: () => { this.notify.success('Deleted'); this.load(); },
          error: () => this.notify.error('Failed to delete')
        });
      }
    });
  }
}
