import {
  AttendanceService
} from "./chunk-T2LL65DA.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-WKFSTWQH.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatNativeDateModule
} from "./chunk-VJ6MZYUL.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-W4NTCVPD.js";
import "./chunk-5OJCATJO.js";
import {
  ConfirmDialogComponent,
  MatDialog,
  MatDialogModule
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
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
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
  CommonModule,
  DatePipe
} from "./chunk-SHRFXLIA.js";
import {
  Component,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-Y7B74RYZ.js";

// src/app/features/attendance/permission/permission-list/permission-list.component.ts
function PermissionListComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "h3", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 33);
    \u0275\u0275listener("ngSubmit", function PermissionListComponent_Conditional_31_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275elementStart(4, "mat-form-field", 34)(5, "mat-label");
    \u0275\u0275text(6, "Card No");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 34)(9, "mat-label");
    \u0275\u0275text(10, "Permission Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-select", 36)(12, "mat-option", 37);
    \u0275\u0275text(13, "Annual Leave");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 38);
    \u0275\u0275text(15, "Sick Leave");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 39);
    \u0275\u0275text(17, "Maternity Leave");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-option", 40);
    \u0275\u0275text(19, "Permission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-option", 41);
    \u0275\u0275text(21, "Other");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "mat-form-field", 34)(23, "mat-label");
    \u0275\u0275text(24, "Leave Hours");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-form-field", 34)(27, "mat-label");
    \u0275\u0275text(28, "From Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 43)(30, "mat-datepicker-toggle", 13)(31, "mat-datepicker", null, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "mat-form-field", 34)(34, "mat-label");
    \u0275\u0275text(35, "To Date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 44)(37, "mat-datepicker-toggle", 13)(38, "mat-datepicker", null, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "mat-form-field", 34)(41, "mat-label");
    \u0275\u0275text(42, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 46)(45, "button", 47);
    \u0275\u0275listener("click", function PermissionListComponent_Conditional_31_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275text(46, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 48);
    \u0275\u0275text(48, "Save");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p1_r4 = \u0275\u0275reference(32);
    const p2_r5 = \u0275\u0275reference(39);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingId() ? "Edit" : "Add", " Permission ");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.form);
    \u0275\u0275advance(26);
    \u0275\u0275property("matDatepicker", p1_r4);
    \u0275\u0275advance();
    \u0275\u0275property("for", p1_r4);
    \u0275\u0275advance(6);
    \u0275\u0275property("matDatepicker", p2_r5);
    \u0275\u0275advance();
    \u0275\u0275property("for", p2_r5);
  }
}
function PermissionListComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "Card No");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r6.empCardNo);
  }
}
function PermissionListComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r7.permissionType);
  }
}
function PermissionListComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "From");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r8.fromDate, "dd/MM/yyyy"));
  }
}
function PermissionListComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "To");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r9.toDate, "dd/MM/yyyy"));
  }
}
function PermissionListComponent_th_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "Hours");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r10.leaveHours);
  }
}
function PermissionListComponent_th_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r11.description || "\u2014");
  }
}
function PermissionListComponent_th_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 52);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function PermissionListComponent_td_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 51)(1, "button", 53);
    \u0275\u0275listener("click", function PermissionListComponent_td_54_Template_button_click_1_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openForm(row_r13));
    });
    \u0275\u0275elementStart(2, "mat-icon", 54);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 55);
    \u0275\u0275listener("click", function PermissionListComponent_td_54_Template_button_click_4_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete(row_r13));
    });
    \u0275\u0275elementStart(5, "mat-icon", 56);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function PermissionListComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 57);
  }
}
function PermissionListComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 58);
  }
}
function PermissionListComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1, "No records. Apply search filters above.");
    \u0275\u0275elementEnd();
  }
}
var PermissionListComponent = class _PermissionListComponent {
  constructor(svc, notify, dialog, fb) {
    this.svc = svc;
    this.notify = notify;
    this.dialog = dialog;
    this.fb = fb;
    this.columns = ["empCardNo", "permissionType", "fromDate", "toDate", "leaveHours", "description", "actions"];
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
    this.empCardNo = "";
    this.dateFrom = null;
    this.dateTo = null;
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : []);
    this.form = this.fb.group({
      empCardNo: [""],
      permissionType: ["Annual Leave"],
      fromDate: [null],
      toDate: [null],
      description: [""],
      leaveHours: [null]
    });
  }
  load(page) {
    const fmt = (d) => d ? d.toISOString().split("T")[0] : void 0;
    this.svc.getPermissions(this.empCardNo || void 0, fmt(this.dateFrom), fmt(this.dateTo), page).subscribe((res) => {
      if (res.success) {
        this.rows.set(res.data.content ?? []);
        this.total.set(res.data.totalElements ?? 0);
      }
    });
  }
  onPage(event) {
    this.load(event.pageIndex);
  }
  openForm(row) {
    this.showForm.set(true);
    this.editingId.set(row?.id ?? null);
    this.form.reset({
      empCardNo: row?.empCardNo ?? "",
      permissionType: row?.permissionType ?? "Annual Leave",
      fromDate: row?.fromDate ?? null,
      toDate: row?.toDate ?? null,
      description: row?.description ?? "",
      leaveHours: row?.leaveHours ?? null
    });
  }
  cancelForm() {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset();
  }
  save() {
    const id = this.editingId();
    const action = id ? this.svc.updatePermission(id, this.form.value) : this.svc.createPermission(this.form.value);
    action.subscribe({ next: () => {
      this.notify.success("Saved");
      this.cancelForm();
      this.load(0);
    }, error: () => this.notify.error("Failed") });
  }
  confirmDelete(row) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: "Delete Permission", message: "Delete this permission record?" } }).afterClosed().subscribe((ok) => {
      if (ok)
        this.svc.deletePermission(row.id).subscribe({ next: () => {
          this.notify.success("Deleted");
          this.load(0);
        }, error: () => this.notify.error("Failed") });
    });
  }
  static {
    this.\u0275fac = function PermissionListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PermissionListComponent)(\u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PermissionListComponent, selectors: [["app-permission-list"]], decls: 59, vars: 14, consts: [["fromPicker", ""], ["toPicker", ""], ["p1", ""], ["p2", ""], [1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "mb-4", "flex", "gap-4", "flex-wrap", "items-end"], ["appearance", "outline", 1, "max-w-xs"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["appearance", "outline", 1, "w-44"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matSuffix", "", 3, "for"], [1, "card", "mb-4", "border-2", "border-indigo-200"], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "empCardNo"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-mono", 4, "matCellDef"], ["matColumnDef", "permissionType"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fromDate"], ["matColumnDef", "toDate"], ["matColumnDef", "leaveHours"], ["matColumnDef", "description"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], ["showFirstLastButtons", "", 3, "page", "length", "pageSize"], [1, "text-base", "font-semibold", "mb-4"], [1, "grid", "grid-cols-3", "gap-4", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "empCardNo"], ["formControlName", "permissionType"], ["value", "Annual Leave"], ["value", "Sick Leave"], ["value", "Maternity Leave"], ["value", "Permission"], ["value", "Other"], ["matInput", "", "type", "number", "formControlName", "leaveHours"], ["matInput", "", "formControlName", "fromDate", 3, "matDatepicker"], ["matInput", "", "formControlName", "toDate", 3, "matDatepicker"], ["matInput", "", "formControlName", "description"], [1, "col-span-3", "flex", "gap-2", "justify-end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "submit"], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-mono"], ["mat-cell", ""], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function PermissionListComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "h1", 6);
        \u0275\u0275text(3, "Record Permission");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 7);
        \u0275\u0275listener("click", function PermissionListComponent_Template_button_click_4_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Add Permission ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 8)(9, "mat-form-field", 9)(10, "mat-label");
        \u0275\u0275text(11, "Card No");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function PermissionListComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.empCardNo, $event) || (ctx.empCardNo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "mat-form-field", 11)(14, "mat-label");
        \u0275\u0275text(15, "From Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function PermissionListComponent_Template_input_ngModelChange_16_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "mat-datepicker-toggle", 13)(18, "mat-datepicker", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "mat-form-field", 11)(21, "mat-label");
        \u0275\u0275text(22, "To Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function PermissionListComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "mat-datepicker-toggle", 13)(25, "mat-datepicker", null, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "button", 7);
        \u0275\u0275listener("click", function PermissionListComponent_Template_button_click_27_listener() {
          return ctx.load(0);
        });
        \u0275\u0275elementStart(28, "mat-icon");
        \u0275\u0275text(29, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275text(30, " Search ");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(31, PermissionListComponent_Conditional_31_Template, 49, 6, "div", 14);
        \u0275\u0275elementStart(32, "div", 15)(33, "table", 16);
        \u0275\u0275elementContainerStart(34, 17);
        \u0275\u0275template(35, PermissionListComponent_th_35_Template, 2, 0, "th", 18)(36, PermissionListComponent_td_36_Template, 2, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(37, 20);
        \u0275\u0275template(38, PermissionListComponent_th_38_Template, 2, 0, "th", 18)(39, PermissionListComponent_td_39_Template, 2, 1, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(40, 22);
        \u0275\u0275template(41, PermissionListComponent_th_41_Template, 2, 0, "th", 18)(42, PermissionListComponent_td_42_Template, 3, 4, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(43, 23);
        \u0275\u0275template(44, PermissionListComponent_th_44_Template, 2, 0, "th", 18)(45, PermissionListComponent_td_45_Template, 3, 4, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(46, 24);
        \u0275\u0275template(47, PermissionListComponent_th_47_Template, 2, 0, "th", 18)(48, PermissionListComponent_td_48_Template, 2, 1, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(49, 25);
        \u0275\u0275template(50, PermissionListComponent_th_50_Template, 2, 0, "th", 18)(51, PermissionListComponent_td_51_Template, 2, 1, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(52, 26);
        \u0275\u0275template(53, PermissionListComponent_th_53_Template, 2, 0, "th", 27)(54, PermissionListComponent_td_54_Template, 7, 0, "td", 21);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(55, PermissionListComponent_tr_55_Template, 1, 0, "tr", 28)(56, PermissionListComponent_tr_56_Template, 1, 0, "tr", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(57, PermissionListComponent_Conditional_57_Template, 2, 0, "div", 30);
        \u0275\u0275elementStart(58, "mat-paginator", 31);
        \u0275\u0275listener("page", function PermissionListComponent_Template_mat_paginator_page_58_listener($event) {
          return ctx.onPage($event);
        });
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const fromPicker_r14 = \u0275\u0275reference(19);
        const toPicker_r15 = \u0275\u0275reference(26);
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.empCardNo);
        \u0275\u0275advance(4);
        \u0275\u0275property("matDatepicker", fromPicker_r14);
        \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
        \u0275\u0275advance();
        \u0275\u0275property("for", fromPicker_r14);
        \u0275\u0275advance(6);
        \u0275\u0275property("matDatepicker", toPicker_r15);
        \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
        \u0275\u0275advance();
        \u0275\u0275property("for", toPicker_r15);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.showForm() ? 31 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.rows());
        \u0275\u0275advance(22);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.rows().length === 0 ? 57 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("length", ctx.total())("pageSize", 20);
      }
    }, dependencies: [
      CommonModule,
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      NgModel,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatButtonModule,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatSuffix,
      MatInputModule,
      MatInput,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatDatepickerModule,
      MatDatepicker,
      MatDatepickerInput,
      MatDatepickerToggle,
      MatNativeDateModule,
      MatPaginatorModule,
      MatPaginator,
      MatDialogModule,
      MatTooltipModule,
      MatTooltip,
      DatePipe
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PermissionListComponent, [{
    type: Component,
    args: [{
      selector: "app-permission-list",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTooltipModule
      ],
      template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Record Permission</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Permission
        </button>
      </div>

      <!-- Filters -->
      <div class="card mb-4 flex gap-4 flex-wrap items-end">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Card No</mat-label>
          <input matInput [(ngModel)]="empCardNo" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-44">
          <mat-label>From Date</mat-label>
          <input matInput [matDatepicker]="fromPicker" [(ngModel)]="dateFrom" />
          <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
          <mat-datepicker #fromPicker></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-44">
          <mat-label>To Date</mat-label>
          <input matInput [matDatepicker]="toPicker" [(ngModel)]="dateTo" />
          <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
          <mat-datepicker #toPicker></mat-datepicker>
        </mat-form-field>
        <button mat-flat-button color="primary" (click)="load(0)">
          <mat-icon>search</mat-icon> Search
        </button>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4">
            {{ editingId() ? 'Edit' : 'Add' }} Permission
          </h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Card No</mat-label>
              <input matInput formControlName="empCardNo" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Permission Type</mat-label>
              <mat-select formControlName="permissionType">
                <mat-option value="Annual Leave">Annual Leave</mat-option>
                <mat-option value="Sick Leave">Sick Leave</mat-option>
                <mat-option value="Maternity Leave">Maternity Leave</mat-option>
                <mat-option value="Permission">Permission</mat-option>
                <mat-option value="Other">Other</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Leave Hours</mat-label>
              <input matInput type="number" formControlName="leaveHours" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>From Date</mat-label>
              <input matInput [matDatepicker]="p1" formControlName="fromDate" />
              <mat-datepicker-toggle matSuffix [for]="p1"></mat-datepicker-toggle>
              <mat-datepicker #p1></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>To Date</mat-label>
              <input matInput [matDatepicker]="p2" formControlName="toDate" />
              <mat-datepicker-toggle matSuffix [for]="p2"></mat-datepicker-toggle>
              <mat-datepicker #p2></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <input matInput formControlName="description" />
            </mat-form-field>
            <div class="col-span-3 flex gap-2 justify-end">
              <button mat-stroked-button type="button" (click)="cancelForm()">Cancel</button>
              <button mat-flat-button color="primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      }

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="rows()" class="w-full">
          <ng-container matColumnDef="empCardNo">
            <th mat-header-cell *matHeaderCellDef>Card No</th>
            <td mat-cell *matCellDef="let row" class="font-mono">{{ row.empCardNo }}</td>
          </ng-container>
          <ng-container matColumnDef="permissionType">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let row">{{ row.permissionType }}</td>
          </ng-container>
          <ng-container matColumnDef="fromDate">
            <th mat-header-cell *matHeaderCellDef>From</th>
            <td mat-cell *matCellDef="let row">{{ row.fromDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="toDate">
            <th mat-header-cell *matHeaderCellDef>To</th>
            <td mat-cell *matCellDef="let row">{{ row.toDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="leaveHours">
            <th mat-header-cell *matHeaderCellDef>Hours</th>
            <td mat-cell *matCellDef="let row">{{ row.leaveHours }}</td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let row">{{ row.description || '\u2014' }}</td>
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
        @if (rows().length === 0) {
          <div class="text-center py-12 text-slate-400">No records. Apply search filters above.</div>
        }
        <mat-paginator [length]="total()" [pageSize]="20" (page)="onPage($event)" showFirstLastButtons></mat-paginator>
      </div>
    </div>
  `
    }]
  }], () => [{ type: AttendanceService }, { type: NotificationService }, { type: MatDialog }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PermissionListComponent, { className: "PermissionListComponent", filePath: "src/app/features/attendance/permission/permission-list/permission-list.component.ts", lineNumber: 158 });
})();
export {
  PermissionListComponent
};
//# sourceMappingURL=chunk-RM46V5SU.js.map
