import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-5PFWYYBE.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-YSFOVXNL.js";
import "./chunk-5OJCATJO.js";
import {
  HrService
} from "./chunk-DGD4TA3G.js";
import {
  ConfirmDialogComponent,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-3VKWKUGN.js";
import {
  NotificationService
} from "./chunk-JOOWYU7I.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-TLHSBJGJ.js";
import "./chunk-4HYEVELO.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-RKNMVPH2.js";
import {
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
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
  Inject,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Y7B74RYZ.js";

// src/app/features/hr/group-position/group-position-form/group-position-form.component.ts
function GroupPositionFormComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionFormComponent_For_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 46)(2, "mat-form-field", 47);
    \u0275\u0275element(3, "input", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 46)(5, "mat-form-field", 47);
    \u0275\u0275element(6, "input", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 50)(8, "button", 51);
    \u0275\u0275listener("click", function GroupPositionFormComponent_For_90_Template_button_click_8_listener() {
      const \u0275$index_154_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.leaveArray.removeAt(\u0275$index_154_r2));
    });
    \u0275\u0275elementStart(9, "mat-icon", 52);
    \u0275\u0275text(10, "remove_circle");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const \u0275$index_154_r2 = ctx.$index;
    \u0275\u0275property("formGroupName", \u0275$index_154_r2);
  }
}
function GroupPositionFormComponent_For_108_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 46)(2, "mat-form-field", 47);
    \u0275\u0275element(3, "input", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 46)(5, "mat-form-field", 47);
    \u0275\u0275element(6, "input", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 46)(8, "mat-form-field", 47);
    \u0275\u0275element(9, "input", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 50)(11, "button", 51);
    \u0275\u0275listener("click", function GroupPositionFormComponent_For_108_Template_button_click_11_listener() {
      const \u0275$index_203_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.bonusArray.removeAt(\u0275$index_203_r5));
    });
    \u0275\u0275elementStart(12, "mat-icon", 52);
    \u0275\u0275text(13, "remove_circle");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const \u0275$index_203_r5 = ctx.$index;
    \u0275\u0275property("formGroupName", \u0275$index_203_r5);
  }
}
var GroupPositionFormComponent = class _GroupPositionFormComponent {
  constructor(dialogRef, data, fb, hrService, notify) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    this.hrService = hrService;
    this.notify = notify;
    this.editId = signal(null, ...ngDevMode ? [{ debugName: "editId" }] : []);
    this.form = this.fb.group({
      nativeName: ["", Validators.required],
      foreignName: [""],
      description: [""],
      ot1: [false],
      ot2: [false],
      ot3: [false],
      payForOt1Food: [false],
      payForOt2Food: [false],
      payForOt3Food: [false],
      payForSaturday: [false],
      payForSunday: [false],
      payForHoliday: [false],
      shiftAllowance: [false],
      neverAbsence: [false],
      allowOtHalfHour: [false],
      attendanceAllowance: [0],
      goHomePercent: [0],
      pregnantDayAllowed: [0],
      endContract: [0],
      pregnantRate: [0],
      annualLeaveDayAllowed: [0],
      leaveIncreases: this.fb.array([]),
      seniorityBonuses: this.fb.array([])
    });
  }
  ngOnInit() {
    if (this.data) {
      this.editId.set(this.data);
      this.hrService.getGroupPosition(this.data).subscribe((res) => {
        if (res.success)
          this.patchForm(res.data);
      });
    }
  }
  get leaveArray() {
    return this.form.get("leaveIncreases");
  }
  get bonusArray() {
    return this.form.get("seniorityBonuses");
  }
  addLeaveRow() {
    this.leaveArray.push(this.fb.group({ year: [null], days: [null] }));
  }
  addBonusRow() {
    this.bonusArray.push(this.fb.group({ year: [null], amount: [null], percent: [null] }));
  }
  patchForm(gp) {
    this.form.patchValue(__spreadValues({}, gp));
    this.leaveArray.clear();
    gp.leaveIncreases?.forEach((li) => this.leaveArray.push(this.fb.group({ year: [li.year], days: [li.days] })));
    this.bonusArray.clear();
    gp.seniorityBonuses?.forEach((sb) => this.bonusArray.push(this.fb.group({ year: [sb.year], amount: [sb.amount], percent: [sb.percent] })));
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.editId();
    const action = id ? this.hrService.updateGroupPosition(id, this.form.value) : this.hrService.createGroupPosition(this.form.value);
    action.subscribe({
      next: () => {
        this.notify.success("Saved");
        this.dialogRef.close(true);
      },
      error: () => this.notify.error("Failed to save")
    });
  }
  static {
    this.\u0275fac = function GroupPositionFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupPositionFormComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HrService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupPositionFormComponent, selectors: [["app-group-position-form"]], decls: 114, vars: 3, consts: [[1, "p-6", "min-w-[800px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold"], ["mat-icon-button", "", 3, "click"], [3, "ngSubmit", "formGroup"], ["label", "Basic Info"], [1, "grid", "grid-cols-2", "gap-4", "pt-4"], ["appearance", "outline"], ["matInput", "", "formControlName", "nativeName"], ["matInput", "", "formControlName", "foreignName"], ["appearance", "outline", 1, "col-span-2"], ["matInput", "", "formControlName", "description", "rows", "2"], ["matInput", "", "type", "number", "formControlName", "annualLeaveDayAllowed"], ["matInput", "", "type", "number", "formControlName", "attendanceAllowance"], ["label", "Payment Rules"], [1, "grid", "grid-cols-3", "gap-2", "pt-4"], ["formControlName", "ot1"], ["formControlName", "ot2"], ["formControlName", "ot3"], ["formControlName", "payForOt1Food"], ["formControlName", "payForOt2Food"], ["formControlName", "payForOt3Food"], ["formControlName", "payForSaturday"], ["formControlName", "payForSunday"], ["formControlName", "payForHoliday"], ["formControlName", "shiftAllowance"], ["formControlName", "neverAbsence"], ["formControlName", "allowOtHalfHour"], [1, "grid", "grid-cols-3", "gap-4", "mt-4"], ["matInput", "", "type", "number", "formControlName", "goHomePercent"], ["matInput", "", "type", "number", "formControlName", "pregnantDayAllowed"], ["matInput", "", "type", "number", "formControlName", "pregnantRate"], ["matInput", "", "type", "number", "formControlName", "endContract"], ["label", "Leave Increase by Year"], [1, "pt-4"], [1, "flex", "justify-end", "mb-3"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["formArrayName", "leaveIncreases", 1, "w-full", "text-sm"], [1, "bg-slate-50", "text-slate-600"], [1, "px-3", "py-2", "text-left"], [1, "w-12"], [1, "border-b", "border-slate-100", 3, "formGroupName"], ["label", "Seniority Bonus"], ["formArrayName", "seniorityBonuses", 1, "w-full", "text-sm"], [1, "flex", "justify-end", "gap-2", "mt-6"], ["mat-flat-button", "", "color", "primary", "type", "submit"], [1, "px-2", "py-1"], ["appearance", "outline", 1, "dense"], ["matInput", "", "type", "number", "formControlName", "year"], ["matInput", "", "type", "number", "formControlName", "days"], [1, "px-2"], ["mat-icon-button", "", "type", "button", 3, "click"], [1, "text-red-400"], ["matInput", "", "type", "number", "formControlName", "amount"], ["matInput", "", "type", "number", "formControlName", "percent"]], template: function GroupPositionFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function GroupPositionFormComponent_Template_button_click_4_listener() {
          return ctx.dialogRef.close(false);
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "close");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "form", 4);
        \u0275\u0275listener("ngSubmit", function GroupPositionFormComponent_Template_form_ngSubmit_7_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(8, "mat-tab-group")(9, "mat-tab", 5)(10, "div", 6)(11, "mat-form-field", 7)(12, "mat-label");
        \u0275\u0275text(13, "Native Name *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 8);
        \u0275\u0275conditionalCreate(15, GroupPositionFormComponent_Conditional_15_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "mat-form-field", 7)(17, "mat-label");
        \u0275\u0275text(18, "Foreign Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-form-field", 10)(21, "mat-label");
        \u0275\u0275text(22, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "textarea", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "mat-form-field", 7)(25, "mat-label");
        \u0275\u0275text(26, "Annual Leave Days");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "mat-form-field", 7)(29, "mat-label");
        \u0275\u0275text(30, "Attendance Allowance ($)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 13);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "mat-tab", 14)(33, "div", 15)(34, "mat-checkbox", 16);
        \u0275\u0275text(35, "OT1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "mat-checkbox", 17);
        \u0275\u0275text(37, "OT2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "mat-checkbox", 18);
        \u0275\u0275text(39, "OT3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "mat-checkbox", 19);
        \u0275\u0275text(41, "Food for OT1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "mat-checkbox", 20);
        \u0275\u0275text(43, "Food for OT2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "mat-checkbox", 21);
        \u0275\u0275text(45, "Food for OT3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "mat-checkbox", 22);
        \u0275\u0275text(47, "Saturday Pay");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "mat-checkbox", 23);
        \u0275\u0275text(49, "Sunday Pay");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "mat-checkbox", 24);
        \u0275\u0275text(51, "Holiday Pay");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "mat-checkbox", 25);
        \u0275\u0275text(53, "Shift Allowance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "mat-checkbox", 26);
        \u0275\u0275text(55, "Never Absence Bonus");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "mat-checkbox", 27);
        \u0275\u0275text(57, "Allow OT Half Hour");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "div", 28)(59, "mat-form-field", 7)(60, "mat-label");
        \u0275\u0275text(61, "Go Home %");
        \u0275\u0275elementEnd();
        \u0275\u0275element(62, "input", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "mat-form-field", 7)(64, "mat-label");
        \u0275\u0275text(65, "Pregnant Days");
        \u0275\u0275elementEnd();
        \u0275\u0275element(66, "input", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "mat-form-field", 7)(68, "mat-label");
        \u0275\u0275text(69, "Pregnant Rate %");
        \u0275\u0275elementEnd();
        \u0275\u0275element(70, "input", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "mat-form-field", 7)(72, "mat-label");
        \u0275\u0275text(73, "End Contract %");
        \u0275\u0275elementEnd();
        \u0275\u0275element(74, "input", 32);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(75, "mat-tab", 33)(76, "div", 34)(77, "div", 35)(78, "button", 36);
        \u0275\u0275listener("click", function GroupPositionFormComponent_Template_button_click_78_listener() {
          return ctx.addLeaveRow();
        });
        \u0275\u0275elementStart(79, "mat-icon");
        \u0275\u0275text(80, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(81, " Add Row ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(82, "table", 37)(83, "tr", 38)(84, "th", 39);
        \u0275\u0275text(85, "Year");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "th", 39);
        \u0275\u0275text(87, "Days");
        \u0275\u0275elementEnd();
        \u0275\u0275element(88, "th", 40);
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(89, GroupPositionFormComponent_For_90_Template, 11, 1, "tr", 41, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(91, "mat-tab", 42)(92, "div", 34)(93, "div", 35)(94, "button", 36);
        \u0275\u0275listener("click", function GroupPositionFormComponent_Template_button_click_94_listener() {
          return ctx.addBonusRow();
        });
        \u0275\u0275elementStart(95, "mat-icon");
        \u0275\u0275text(96, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(97, " Add Row ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(98, "table", 43)(99, "tr", 38)(100, "th", 39);
        \u0275\u0275text(101, "Year");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(102, "th", 39);
        \u0275\u0275text(103, "Amount ($)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "th", 39);
        \u0275\u0275text(105, "Percent (%)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(106, "th", 40);
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(107, GroupPositionFormComponent_For_108_Template, 14, 1, "tr", 41, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(109, "div", 44)(110, "button", 36);
        \u0275\u0275listener("click", function GroupPositionFormComponent_Template_button_click_110_listener() {
          return ctx.dialogRef.close(false);
        });
        \u0275\u0275text(111, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "button", 45);
        \u0275\u0275text(113, "Save");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("", ctx.editId() ? "Edit" : "Add", " Group Position");
        \u0275\u0275advance(4);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("nativeName")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("nativeName")) == null ? null : tmp_2_0.touched) ? 15 : -1);
        \u0275\u0275advance(74);
        \u0275\u0275repeater(ctx.leaveArray.controls);
        \u0275\u0275advance(18);
        \u0275\u0275repeater(ctx.bonusArray.controls);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, MatDialogModule, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatError, MatInputModule, MatInput, MatCheckboxModule, MatCheckbox, MatTabsModule, MatTab, MatTabGroup], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupPositionFormComponent, [{
    type: Component,
    args: [{
      selector: "app-group-position-form",
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTabsModule
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
    }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }, { type: HrService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupPositionFormComponent, { className: "GroupPositionFormComponent", filePath: "src/app/features/hr/group-position/group-position-form/group-position-form.component.ts", lineNumber: 186 });
})();

// src/app/features/hr/group-position/group-position-list/group-position-list.component.ts
function GroupPositionListComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r1 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r1 + 1);
  }
}
function GroupPositionListComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Native Name");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r2.nativeName);
  }
}
function GroupPositionListComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Foreign Name");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.foreignName || "\u2014");
  }
}
function GroupPositionListComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "Annual Leave (days)");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.annualLeaveDayAllowed ?? 0);
  }
}
function GroupPositionListComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1, "OT");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "OT1");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "OT2");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_24_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "OT3");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275conditionalCreate(1, GroupPositionListComponent_td_24_Conditional_1_Template, 2, 0, "span", 24);
    \u0275\u0275conditionalCreate(2, GroupPositionListComponent_td_24_Conditional_2_Template, 2, 0, "span", 24);
    \u0275\u0275conditionalCreate(3, GroupPositionListComponent_td_24_Conditional_3_Template, 2, 0, "span", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r5.ot1 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r5.ot2 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r5.ot3 ? 3 : -1);
  }
}
function GroupPositionListComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function GroupPositionListComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 21)(1, "button", 26);
    \u0275\u0275listener("click", function GroupPositionListComponent_td_27_Template_button_click_1_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.openForm(row_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon", 27);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function GroupPositionListComponent_td_27_Template_button_click_4_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.confirmDelete(row_r7));
    });
    \u0275\u0275elementStart(5, "mat-icon", 29);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function GroupPositionListComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
}
function GroupPositionListComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function GroupPositionListComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, "No group positions found");
    \u0275\u0275elementEnd();
  }
}
var GroupPositionListComponent = class _GroupPositionListComponent {
  constructor(hrService, notify, dialog) {
    this.hrService = hrService;
    this.notify = notify;
    this.dialog = dialog;
    this.columns = ["no", "nativeName", "foreignName", "annualLeave", "ot", "actions"];
    this.items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.hrService.getGroupPositions().subscribe((res) => {
      if (res.success)
        this.items.set(res.data);
    });
  }
  openForm(item) {
    this.dialog.open(GroupPositionFormComponent, {
      data: item ? item.id : null,
      width: "900px",
      maxHeight: "90vh"
    }).afterClosed().subscribe((saved) => {
      if (saved)
        this.load();
    });
  }
  confirmDelete(item) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: "Delete Group Position", message: `Delete "${item.nativeName}"?` } }).afterClosed().subscribe((ok) => {
      if (ok && item.id)
        this.hrService.deleteGroupPosition(item.id).subscribe({
          next: () => {
            this.notify.success("Deleted");
            this.load();
          },
          error: () => this.notify.error("Failed")
        });
    });
  }
  static {
    this.\u0275fac = function GroupPositionListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GroupPositionListComponent)(\u0275\u0275directiveInject(HrService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupPositionListComponent, selectors: [["app-group-position-list"]], decls: 31, vars: 4, consts: [[1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "no"], ["mat-header-cell", "", "class", "w-12", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "nativeName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-medium", 4, "matCellDef"], ["matColumnDef", "foreignName"], ["matColumnDef", "annualLeave"], ["matColumnDef", "ot"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], ["mat-header-cell", "", 1, "w-12"], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-medium"], [1, "badge-blue", "mr-1"], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function GroupPositionListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Group Position");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function GroupPositionListComponent_Template_button_click_4_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Add Group Position ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "table", 5);
        \u0275\u0275elementContainerStart(10, 6);
        \u0275\u0275template(11, GroupPositionListComponent_th_11_Template, 2, 0, "th", 7)(12, GroupPositionListComponent_td_12_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(13, 9);
        \u0275\u0275template(14, GroupPositionListComponent_th_14_Template, 2, 0, "th", 10)(15, GroupPositionListComponent_td_15_Template, 2, 1, "td", 11);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(16, 12);
        \u0275\u0275template(17, GroupPositionListComponent_th_17_Template, 2, 0, "th", 10)(18, GroupPositionListComponent_td_18_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(19, 13);
        \u0275\u0275template(20, GroupPositionListComponent_th_20_Template, 2, 0, "th", 10)(21, GroupPositionListComponent_td_21_Template, 2, 1, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(22, 14);
        \u0275\u0275template(23, GroupPositionListComponent_th_23_Template, 2, 0, "th", 10)(24, GroupPositionListComponent_td_24_Template, 4, 3, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(25, 15);
        \u0275\u0275template(26, GroupPositionListComponent_th_26_Template, 2, 0, "th", 16)(27, GroupPositionListComponent_td_27_Template, 7, 0, "td", 8);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(28, GroupPositionListComponent_tr_28_Template, 1, 0, "tr", 17)(29, GroupPositionListComponent_tr_29_Template, 1, 0, "tr", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(30, GroupPositionListComponent_Conditional_30_Template, 2, 0, "div", 19);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("dataSource", ctx.items());
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.items().length === 0 ? 30 : -1);
      }
    }, dependencies: [CommonModule, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatDialogModule, MatTooltipModule, MatTooltip], styles: ["\n\n.badge-blue[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: .2rem .65rem;\n  border-radius: 99px;\n  font-size: .7rem;\n  font-weight: 600;\n  background: #e0e7ff;\n  color: #3730a3;\n}\n/*# sourceMappingURL=group-position-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupPositionListComponent, [{
    type: Component,
    args: [{ selector: "app-group-position-list", standalone: true, imports: [
      CommonModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatTooltipModule
    ], template: `
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
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '\u2014' }}</td>
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
  `, styles: ["/* angular:styles/component:css;213922da32db4caeaaab2c24372a7aa00fb4636bc11fd324f6997183ea33b577;C:/Vp/dev/the-garment/frontend/src/app/features/hr/group-position/group-position-list/group-position-list.component.ts */\n.badge-blue {\n  display: inline-flex;\n  align-items: center;\n  padding: .2rem .65rem;\n  border-radius: 99px;\n  font-size: .7rem;\n  font-weight: 600;\n  background: #e0e7ff;\n  color: #3730a3;\n}\n/*# sourceMappingURL=group-position-list.component.css.map */\n"] }]
  }], () => [{ type: HrService }, { type: NotificationService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupPositionListComponent, { className: "GroupPositionListComponent", filePath: "src/app/features/hr/group-position/group-position-list/group-position-list.component.ts", lineNumber: 80 });
})();
export {
  GroupPositionListComponent
};
//# sourceMappingURL=chunk-A5KCPB5G.js.map
