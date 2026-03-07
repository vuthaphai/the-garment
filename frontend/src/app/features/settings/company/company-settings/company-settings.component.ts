import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from '@core/services/settings.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-company-settings',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Company Information</h1>
        <button mat-flat-button color="primary" (click)="save()">
          <mat-icon>save</mat-icon> Save Settings
        </button>
      </div>

      <form [formGroup]="form" class="max-w-3xl space-y-6">
        <div class="card">
          <h3 class="text-base font-semibold mb-4 text-slate-700">Company Details</h3>
          <div class="grid grid-cols-2 gap-4">
            <mat-form-field appearance="outline" class="col-span-2">
              <mat-label>Company Name</mat-label>
              <input matInput formControlName="companyName" />
            </mat-form-field>
          </div>
        </div>

        <div class="card">
          <h3 class="text-base font-semibold mb-4 text-slate-700">Working Time Rules</h3>
          <div class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Working Days / Month</mat-label>
              <input matInput type="number" formControlName="workingDayPerMonth" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Working Hours / Day</mat-label>
              <input matInput type="number" formControlName="workingHourPerDay" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Saturday Hours / Day</mat-label>
              <input matInput type="number" formControlName="saturdayHours" />
            </mat-form-field>
            <div class="flex items-center">
              <mat-checkbox formControlName="saturdayWorking">Saturday Working</mat-checkbox>
            </div>
            <div class="flex items-center">
              <mat-checkbox formControlName="cutAttendance">Cut Attendance</mat-checkbox>
            </div>
            <div class="flex items-center">
              <mat-checkbox formControlName="setHolidayByGroup">Set Holiday by Group</mat-checkbox>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-base font-semibold mb-4 text-slate-700">Payroll Rules</h3>
          <div class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Round Riel</mat-label>
              <input matInput type="number" formControlName="roundRiel" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Attendance Allowance Type</mat-label>
              <mat-select formControlName="attendanceAllowanceType">
                <mat-option value="Month">Monthly</mat-option>
                <mat-option value="Day">Daily</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Work Under 14 Days (leave days)</mat-label>
              <input matInput type="number" formControlName="workUnder14Days" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Work 14+ Days (leave days)</mat-label>
              <input matInput type="number" formControlName="workFrom14DaysUp" />
            </mat-form-field>
          </div>
        </div>
      </form>
    </div>
  `
})
export class CompanySettingsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private settingsSvc: SettingsService,
    private notify: NotificationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      companyName: [''],
      workingDayPerMonth: [26], workingHourPerDay: [8],
      saturdayHours: [8], saturdayWorking: [true],
      cutAttendance: [true], setHolidayByGroup: [false],
      roundRiel: [0], attendanceAllowanceType: ['Month'],
      workUnder14Days: [3], workFrom14DaysUp: [6]
    });
  }

  ngOnInit() {
    this.settingsSvc.getCompanySettings().subscribe(res => {
      if (res.success) this.form.patchValue(res.data);
    });
  }

  save() {
    this.settingsSvc.updateCompanySettings(this.form.value).subscribe({
      next: () => this.notify.success('Settings saved'),
      error: () => this.notify.error('Failed to save settings')
    });
  }
}
