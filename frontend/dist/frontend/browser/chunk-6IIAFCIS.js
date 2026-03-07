import {
  SettingsService
} from "./chunk-6RP6PD6F.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-W4NTCVPD.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-YSFOVXNL.js";
import "./chunk-5OJCATJO.js";
import {
  NotificationService
} from "./chunk-JOOWYU7I.js";
import "./chunk-4HYEVELO.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-RKNMVPH2.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-W5V5FLXH.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-B4DS7WTO.js";
import "./chunk-OOR6T4LK.js";
import {
  CommonModule
} from "./chunk-SHRFXLIA.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-Y7B74RYZ.js";

// src/app/features/settings/company/company-settings/company-settings.component.ts
var CompanySettingsComponent = class _CompanySettingsComponent {
  constructor(settingsSvc, notify, fb) {
    this.settingsSvc = settingsSvc;
    this.notify = notify;
    this.fb = fb;
    this.form = this.fb.group({
      companyName: [""],
      workingDayPerMonth: [26],
      workingHourPerDay: [8],
      saturdayHours: [8],
      saturdayWorking: [true],
      cutAttendance: [true],
      setHolidayByGroup: [false],
      roundRiel: [0],
      attendanceAllowanceType: ["Month"],
      workUnder14Days: [3],
      workFrom14DaysUp: [6]
    });
  }
  ngOnInit() {
    this.settingsSvc.getCompanySettings().subscribe((res) => {
      if (res.success)
        this.form.patchValue(res.data);
    });
  }
  save() {
    this.settingsSvc.updateCompanySettings(this.form.value).subscribe({
      next: () => this.notify.success("Settings saved"),
      error: () => this.notify.error("Failed to save settings")
    });
  }
  static {
    this.\u0275fac = function CompanySettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CompanySettingsComponent)(\u0275\u0275directiveInject(SettingsService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompanySettingsComponent, selectors: [["app-company-settings"]], decls: 66, vars: 1, consts: [[1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "max-w-3xl", "space-y-6", 3, "formGroup"], [1, "card"], [1, "text-base", "font-semibold", "mb-4", "text-slate-700"], [1, "grid", "grid-cols-2", "gap-4"], ["appearance", "outline", 1, "col-span-2"], ["matInput", "", "formControlName", "companyName"], [1, "grid", "grid-cols-3", "gap-4"], ["appearance", "outline"], ["matInput", "", "type", "number", "formControlName", "workingDayPerMonth"], ["matInput", "", "type", "number", "formControlName", "workingHourPerDay"], ["matInput", "", "type", "number", "formControlName", "saturdayHours"], [1, "flex", "items-center"], ["formControlName", "saturdayWorking"], ["formControlName", "cutAttendance"], ["formControlName", "setHolidayByGroup"], ["matInput", "", "type", "number", "formControlName", "roundRiel"], ["formControlName", "attendanceAllowanceType"], ["value", "Month"], ["value", "Day"], ["matInput", "", "type", "number", "formControlName", "workUnder14Days"], ["matInput", "", "type", "number", "formControlName", "workFrom14DaysUp"]], template: function CompanySettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Company Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function CompanySettingsComponent_Template_button_click_4_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "save");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Save Settings ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "form", 4)(9, "div", 5)(10, "h3", 6);
        \u0275\u0275text(11, "Company Details");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7)(13, "mat-form-field", 8)(14, "mat-label");
        \u0275\u0275text(15, "Company Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 5)(18, "h3", 6);
        \u0275\u0275text(19, "Working Time Rules");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 10)(21, "mat-form-field", 11)(22, "mat-label");
        \u0275\u0275text(23, "Working Days / Month");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-form-field", 11)(26, "mat-label");
        \u0275\u0275text(27, "Working Hours / Day");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "mat-form-field", 11)(30, "mat-label");
        \u0275\u0275text(31, "Saturday Hours / Day");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 15)(34, "mat-checkbox", 16);
        \u0275\u0275text(35, "Saturday Working");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 15)(37, "mat-checkbox", 17);
        \u0275\u0275text(38, "Cut Attendance");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 15)(40, "mat-checkbox", 18);
        \u0275\u0275text(41, "Set Holiday by Group");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(42, "div", 5)(43, "h3", 6);
        \u0275\u0275text(44, "Payroll Rules");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "div", 10)(46, "mat-form-field", 11)(47, "mat-label");
        \u0275\u0275text(48, "Round Riel");
        \u0275\u0275elementEnd();
        \u0275\u0275element(49, "input", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "mat-form-field", 11)(51, "mat-label");
        \u0275\u0275text(52, "Attendance Allowance Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "mat-select", 20)(54, "mat-option", 21);
        \u0275\u0275text(55, "Monthly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "mat-option", 22);
        \u0275\u0275text(57, "Daily");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(58, "mat-form-field", 11)(59, "mat-label");
        \u0275\u0275text(60, "Work Under 14 Days (leave days)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(61, "input", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "mat-form-field", 11)(63, "mat-label");
        \u0275\u0275text(64, "Work 14+ Days (leave days)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(65, "input", 24);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.form);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButtonModule, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatCheckboxModule, MatCheckbox, MatSelectModule, MatSelect, MatOption], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompanySettingsComponent, [{
    type: Component,
    args: [{
      selector: "app-company-settings",
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule
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
    }]
  }], () => [{ type: SettingsService }, { type: NotificationService }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompanySettingsComponent, { className: "CompanySettingsComponent", filePath: "src/app/features/settings/company/company-settings/company-settings.component.ts", lineNumber: 95 });
})();
export {
  CompanySettingsComponent
};
//# sourceMappingURL=chunk-6IIAFCIS.js.map
