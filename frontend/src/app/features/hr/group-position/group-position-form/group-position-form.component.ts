import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { GroupPosition } from '@core/models/hr.model';

@Component({
  selector: 'app-group-position-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTabsModule
  ],
  template: `
    <div class="p-6 min-w-[800px]">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">{{ editId() ? 'Edit' : 'Add' }} Group Position</h2>
        <button mat-icon-button (click)="dialogRef.close(false)"><mat-icon>close</mat-icon></button>
      </div>

      <form [formGroup]="form" (ngSubmit)="save()">
        <mat-tab-group>
          <!-- Basic Info -->
          <mat-tab label="Basic Info">
            <div class="grid grid-cols-2 gap-4 pt-4">
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
              <mat-form-field appearance="outline" class="col-span-2">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="2"></textarea>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Annual Leave Days</mat-label>
                <input matInput type="number" formControlName="annualLeaveDayAllowed" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Attendance Allowance ($)</mat-label>
                <input matInput type="number" formControlName="attendanceAllowance" />
              </mat-form-field>
            </div>
          </mat-tab>

          <!-- OT & Payment Rules -->
          <mat-tab label="Payment Rules">
            <div class="grid grid-cols-3 gap-2 pt-4">
              <mat-checkbox formControlName="ot1">OT1</mat-checkbox>
              <mat-checkbox formControlName="ot2">OT2</mat-checkbox>
              <mat-checkbox formControlName="ot3">OT3</mat-checkbox>
              <mat-checkbox formControlName="payForOt1Food">Food for OT1</mat-checkbox>
              <mat-checkbox formControlName="payForOt2Food">Food for OT2</mat-checkbox>
              <mat-checkbox formControlName="payForOt3Food">Food for OT3</mat-checkbox>
              <mat-checkbox formControlName="payForSaturday">Saturday Pay</mat-checkbox>
              <mat-checkbox formControlName="payForSunday">Sunday Pay</mat-checkbox>
              <mat-checkbox formControlName="payForHoliday">Holiday Pay</mat-checkbox>
              <mat-checkbox formControlName="shiftAllowance">Shift Allowance</mat-checkbox>
              <mat-checkbox formControlName="neverAbsence">Never Absence Bonus</mat-checkbox>
              <mat-checkbox formControlName="allowOtHalfHour">Allow OT Half Hour</mat-checkbox>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <mat-form-field appearance="outline">
                <mat-label>Go Home %</mat-label>
                <input matInput type="number" formControlName="goHomePercent" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Pregnant Days</mat-label>
                <input matInput type="number" formControlName="pregnantDayAllowed" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Pregnant Rate %</mat-label>
                <input matInput type="number" formControlName="pregnantRate" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>End Contract %</mat-label>
                <input matInput type="number" formControlName="endContract" />
              </mat-form-field>
            </div>
          </mat-tab>

          <!-- Leave Increase -->
          <mat-tab label="Leave Increase by Year">
            <div class="pt-4">
              <div class="flex justify-end mb-3">
                <button mat-stroked-button type="button" (click)="addLeaveRow()">
                  <mat-icon>add</mat-icon> Add Row
                </button>
              </div>
              <table class="w-full text-sm" formArrayName="leaveIncreases">
                <tr class="bg-slate-50 text-slate-600">
                  <th class="px-3 py-2 text-left">Year</th>
                  <th class="px-3 py-2 text-left">Days</th>
                  <th class="w-12"></th>
                </tr>
                @for (ctrl of leaveArray.controls; track $index; let i = $index) {
                  <tr [formGroupName]="i" class="border-b border-slate-100">
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput type="number" formControlName="year" />
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput type="number" formControlName="days" />
                      </mat-form-field>
                    </td>
                    <td class="px-2">
                      <button mat-icon-button type="button" (click)="leaveArray.removeAt(i)">
                        <mat-icon class="text-red-400">remove_circle</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
              </table>
            </div>
          </mat-tab>

          <!-- Seniority Bonus -->
          <mat-tab label="Seniority Bonus">
            <div class="pt-4">
              <div class="flex justify-end mb-3">
                <button mat-stroked-button type="button" (click)="addBonusRow()">
                  <mat-icon>add</mat-icon> Add Row
                </button>
              </div>
              <table class="w-full text-sm" formArrayName="seniorityBonuses">
                <tr class="bg-slate-50 text-slate-600">
                  <th class="px-3 py-2 text-left">Year</th>
                  <th class="px-3 py-2 text-left">Amount ($)</th>
                  <th class="px-3 py-2 text-left">Percent (%)</th>
                  <th class="w-12"></th>
                </tr>
                @for (ctrl of bonusArray.controls; track $index; let i = $index) {
                  <tr [formGroupName]="i" class="border-b border-slate-100">
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput type="number" formControlName="year" />
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput type="number" formControlName="amount" />
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput type="number" formControlName="percent" />
                      </mat-form-field>
                    </td>
                    <td class="px-2">
                      <button mat-icon-button type="button" (click)="bonusArray.removeAt(i)">
                        <mat-icon class="text-red-400">remove_circle</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
              </table>
            </div>
          </mat-tab>
        </mat-tab-group>

        <div class="flex justify-end gap-2 mt-6">
          <button mat-stroked-button type="button" (click)="dialogRef.close(false)">Cancel</button>
          <button mat-flat-button color="primary" type="submit">Save</button>
        </div>
      </form>
    </div>
  `
})
export class GroupPositionFormComponent implements OnInit {
  form: FormGroup;
  editId = signal<number | null>(null);

  constructor(
    public dialogRef: MatDialogRef<GroupPositionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: number | null,
    private fb: FormBuilder,
    private hrService: HrService,
    private notify: NotificationService
  ) {
    this.form = this.fb.group({
      nativeName: ['', Validators.required],
      foreignName: [''], description: [''],
      ot1: [false], ot2: [false], ot3: [false],
      payForOt1Food: [false], payForOt2Food: [false], payForOt3Food: [false],
      payForSaturday: [false], payForSunday: [false], payForHoliday: [false],
      shiftAllowance: [false], neverAbsence: [false], allowOtHalfHour: [false],
      attendanceAllowance: [0], goHomePercent: [0],
      pregnantDayAllowed: [0], endContract: [0], pregnantRate: [0],
      annualLeaveDayAllowed: [0],
      leaveIncreases: this.fb.array([]),
      seniorityBonuses: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editId.set(this.data);
      this.hrService.getGroupPosition(this.data).subscribe(res => {
        if (res.success) this.patchForm(res.data);
      });
    }
  }

  get leaveArray() { return this.form.get('leaveIncreases') as FormArray; }
  get bonusArray() { return this.form.get('seniorityBonuses') as FormArray; }

  addLeaveRow() {
    this.leaveArray.push(this.fb.group({ year: [null], days: [null] }));
  }

  addBonusRow() {
    this.bonusArray.push(this.fb.group({ year: [null], amount: [null], percent: [null] }));
  }

  patchForm(gp: GroupPosition) {
    this.form.patchValue({ ...gp });
    this.leaveArray.clear();
    gp.leaveIncreases?.forEach(li =>
      this.leaveArray.push(this.fb.group({ year: [li.year], days: [li.days] })));
    this.bonusArray.clear();
    gp.seniorityBonuses?.forEach(sb =>
      this.bonusArray.push(this.fb.group({ year: [sb.year], amount: [sb.amount], percent: [sb.percent] })));
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.editId();
    const action = id
      ? this.hrService.updateGroupPosition(id, this.form.value)
      : this.hrService.createGroupPosition(this.form.value);
    action.subscribe({
      next: () => { this.notify.success('Saved'); this.dialogRef.close(true); },
      error: () => this.notify.error('Failed to save')
    });
  }
}
