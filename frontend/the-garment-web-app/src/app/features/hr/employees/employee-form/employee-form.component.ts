import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HrService } from '@core/services/hr.service';
import { NotificationService } from '@core/services/notification.service';
import { Nationality, Position, GroupPosition, ContractType } from '@core/models/hr.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatTabsModule, MatDatepickerModule, MatNativeDateModule
  ],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">{{ editId() ? 'Edit' : 'Add' }} Employee</h2>
        <button mat-icon-button (click)="dialogRef.close(false)"><mat-icon>close</mat-icon></button>
      </div>

      <form [formGroup]="form" (ngSubmit)="save()">
        <mat-tab-group>
          <!-- Personal Info -->
          <mat-tab label="Personal Info">
            <div class="grid grid-cols-2 gap-4 pt-4">
              <mat-form-field appearance="outline">
                <mat-label>Card No *</mat-label>
                <input matInput formControlName="empCardNo" />
                @if (form.get('empCardNo')?.invalid && form.get('empCardNo')?.touched) {
                  <mat-error>Required</mat-error>
                }
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Serial Card No</mat-label>
                <input matInput formControlName="serialCardNo" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Native Name</mat-label>
                <input matInput formControlName="nativeName" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Foreign Name</mat-label>
                <input matInput formControlName="foreignName" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Date of Birth</mat-label>
                <input matInput [matDatepicker]="dobPicker" formControlName="dateOfBirth" />
                <mat-datepicker-toggle matSuffix [for]="dobPicker"></mat-datepicker-toggle>
                <mat-datepicker #dobPicker></mat-datepicker>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Sex</mat-label>
                <mat-select formControlName="sex">
                  <mat-option value="F">Female</mat-option>
                  <mat-option value="M">Male</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Nationality</mat-label>
                <mat-select formControlName="nationalityId">
                  <mat-option [value]="null">— None —</mat-option>
                  @for (n of nationalities(); track n.id) {
                    <mat-option [value]="n.id">{{ n.nativeName }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Social Security No</mat-label>
                <input matInput formControlName="socialSecurity" />
              </mat-form-field>
            </div>
          </mat-tab>

          <!-- Work Info -->
          <mat-tab label="Work Info">
            <div class="grid grid-cols-2 gap-4 pt-4">
              <mat-form-field appearance="outline">
                <mat-label>Group Position</mat-label>
                <mat-select formControlName="groupPositionId">
                  <mat-option [value]="null">— None —</mat-option>
                  @for (gp of groupPositions(); track gp.id) {
                    <mat-option [value]="gp.id">{{ gp.nativeName }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Position</mat-label>
                <mat-select formControlName="positionId">
                  <mat-option [value]="null">— None —</mat-option>
                  @for (p of positions(); track p.id) {
                    <mat-option [value]="p.id">{{ p.nativeName }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Date Joined</mat-label>
                <input matInput [matDatepicker]="joinPicker" formControlName="dateJoined" />
                <mat-datepicker-toggle matSuffix [for]="joinPicker"></mat-datepicker-toggle>
                <mat-datepicker #joinPicker></mat-datepicker>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Date Resigned</mat-label>
                <input matInput [matDatepicker]="resignPicker" formControlName="dateResigned" />
                <mat-datepicker-toggle matSuffix [for]="resignPicker"></mat-datepicker-toggle>
                <mat-datepicker #resignPicker></mat-datepicker>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Payment Type</mat-label>
                <mat-select formControlName="paymentType">
                  <mat-option value="Month">Monthly</mat-option>
                  <mat-option value="Day">Daily</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Currency</mat-label>
                <mat-select formControlName="currency">
                  <mat-option value="$">USD ($)</mat-option>
                  <mat-option value="R">Riel (R)</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Salary</mat-label>
                <input matInput type="number" formControlName="salary" />
              </mat-form-field>
              <div class="flex items-center">
                <mat-checkbox formControlName="active">Active Employee</mat-checkbox>
              </div>
            </div>
          </mat-tab>

          <!-- Contracts -->
          <mat-tab label="Contracts">
            <div class="pt-4">
              <div class="flex justify-end mb-3">
                <button mat-stroked-button type="button" (click)="addContract()">
                  <mat-icon>add</mat-icon> Add Contract
                </button>
              </div>
              <table class="w-full text-sm" formArrayName="contracts">
                <tr class="bg-slate-50 text-slate-600">
                  <th class="px-3 py-2 text-left">Contract Type</th>
                  <th class="px-3 py-2 text-left">From Date</th>
                  <th class="px-3 py-2 text-left">To Date</th>
                  <th class="px-3 py-2 text-left">Months</th>
                  <th class="w-12"></th>
                </tr>
                @for (ctrl of contractArray.controls; track $index; let i = $index) {
                  <tr [formGroupName]="i" class="border-b border-slate-100">
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense w-full">
                        <mat-select formControlName="contractTypeId">
                          @for (ct of contractTypes(); track ct.id) {
                            <mat-option [value]="ct.id">{{ ct.contractName }}</mat-option>
                          }
                        </mat-select>
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput [matDatepicker]="fromPicker" formControlName="fromDate" />
                        <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
                        <mat-datepicker #fromPicker></mat-datepicker>
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense">
                        <input matInput [matDatepicker]="toPicker" formControlName="toDate" />
                        <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
                        <mat-datepicker #toPicker></mat-datepicker>
                      </mat-form-field>
                    </td>
                    <td class="px-2 py-1">
                      <mat-form-field appearance="outline" class="dense w-20">
                        <input matInput type="number" formControlName="months" />
                      </mat-form-field>
                    </td>
                    <td class="px-2">
                      <button mat-icon-button type="button" (click)="contractArray.removeAt(i)">
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
          <button mat-flat-button color="primary" type="submit">Save Employee</button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  editId = signal<number | null>(null);
  nationalities = signal<Nationality[]>([]);
  positions = signal<Position[]>([]);
  groupPositions = signal<GroupPosition[]>([]);
  contractTypes = signal<ContractType[]>([]);

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: number | null,
    private fb: FormBuilder,
    private hrService: HrService,
    private notify: NotificationService
  ) {
    this.form = this.fb.group({
      empCardNo: ['', Validators.required],
      serialCardNo: [''], nativeName: [''], foreignName: [''],
      dateOfBirth: [null], nationalityId: [null],
      sex: ['F'], socialSecurity: [''],
      groupPositionId: [null], positionId: [null],
      dateJoined: [null], dateResigned: [null],
      paymentType: ['Month'], currency: ['$'],
      salary: [null], active: [true],
      contracts: this.fb.array([])
    });
  }

  ngOnInit() {
    this.hrService.getNationalities().subscribe(r => { if (r.success) this.nationalities.set(r.data); });
    this.hrService.getPositions().subscribe(r => { if (r.success) this.positions.set(r.data); });
    this.hrService.getGroupPositions().subscribe(r => { if (r.success) this.groupPositions.set(r.data); });
    this.hrService.getContractTypes().subscribe(r => { if (r.success) this.contractTypes.set(r.data); });

    if (this.data) {
      this.editId.set(this.data);
      this.hrService.getEmployee(this.data).subscribe(res => {
        if (res.success) {
          const emp = res.data;
          this.form.patchValue({ ...emp });
          this.contractArray.clear();
          emp.contracts?.forEach((c: any) =>
            this.contractArray.push(this.fb.group({
              contractTypeId: [c.contractTypeId],
              fromDate: [c.fromDate], toDate: [c.toDate], months: [c.months]
            }))
          );
        }
      });
    }
  }

  get contractArray() { return this.form.get('contracts') as FormArray; }

  addContract() {
    this.contractArray.push(this.fb.group({
      contractTypeId: [null], fromDate: [null], toDate: [null], months: [null]
    }));
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.editId();
    const action = id
      ? this.hrService.updateEmployee(id, this.form.value)
      : this.hrService.createEmployee(this.form.value);
    action.subscribe({
      next: () => { this.notify.success('Employee saved'); this.dialogRef.close(true); },
      error: () => this.notify.error('Failed to save employee')
    });
  }
}
