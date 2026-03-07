import {
  SettingsService
} from "./chunk-6RP6PD6F.js";
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
  FormsModule,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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

// src/app/features/settings/holiday/holiday-list/holiday-list.component.ts
function HolidayListComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r1 = ctx.$implicit;
    \u0275\u0275property("value", y_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r1);
  }
}
function HolidayListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "h3", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26)(4, "mat-form-field", 27)(5, "mat-label");
    \u0275\u0275text(6, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function HolidayListComponent_Conditional_15_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editDate, $event) || (ctx_r2.editDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "mat-datepicker-toggle", 29)(9, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-form-field", 27)(12, "mat-label");
    \u0275\u0275text(13, "Native Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function HolidayListComponent_Conditional_15_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editNativeName, $event) || (ctx_r2.editNativeName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "mat-form-field", 27)(16, "mat-label");
    \u0275\u0275text(17, "Foreign Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function HolidayListComponent_Conditional_15_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editForeignName, $event) || (ctx_r2.editForeignName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 31)(20, "button", 32);
    \u0275\u0275listener("click", function HolidayListComponent_Conditional_15_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275text(21, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 8);
    \u0275\u0275listener("click", function HolidayListComponent_Conditional_15_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(23, "Save");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dp_r4 = \u0275\u0275reference(10);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingId() ? "Edit" : "Add", " Holiday ");
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", dp_r4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editDate);
    \u0275\u0275advance();
    \u0275\u0275property("for", dp_r4);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editNativeName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editForeignName);
  }
}
function HolidayListComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 33);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function HolidayListComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r5 + 1);
  }
}
function HolidayListComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function HolidayListComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r6.holidayDate, "dd MMMM yyyy"));
  }
}
function HolidayListComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Native Name");
    \u0275\u0275elementEnd();
  }
}
function HolidayListComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r7.nativeName);
  }
}
function HolidayListComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Foreign Name");
    \u0275\u0275elementEnd();
  }
}
function HolidayListComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r8.foreignName || "\u2014");
  }
}
function HolidayListComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function HolidayListComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 34)(1, "button", 38);
    \u0275\u0275listener("click", function HolidayListComponent_td_32_Template_button_click_1_listener() {
      const row_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openForm(row_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon", 39);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 40);
    \u0275\u0275listener("click", function HolidayListComponent_td_32_Template_button_click_4_listener() {
      const row_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete(row_r10));
    });
    \u0275\u0275elementStart(5, "mat-icon", 41);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function HolidayListComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 42);
  }
}
function HolidayListComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 43);
  }
}
function HolidayListComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("No holidays for ", ctx_r2.selectedYear);
  }
}
var HolidayListComponent = class _HolidayListComponent {
  constructor(svc, notify, dialog) {
    this.svc = svc;
    this.notify = notify;
    this.dialog = dialog;
    this.columns = ["no", "holidayDate", "nativeName", "foreignName", "actions"];
    this.holidays = signal([], ...ngDevMode ? [{ debugName: "holidays" }] : []);
    this.selectedYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => this.selectedYear - 1 + i);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : []);
    this.editDate = null;
    this.editNativeName = "";
    this.editForeignName = "";
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.svc.getHolidays(this.selectedYear).subscribe((res) => {
      if (res.success)
        this.holidays.set(res.data);
    });
  }
  openForm(row) {
    this.showForm.set(true);
    this.editingId.set(row?.id ?? null);
    this.editDate = row?.holidayDate ? new Date(row.holidayDate) : null;
    this.editNativeName = row?.nativeName ?? "";
    this.editForeignName = row?.foreignName ?? "";
  }
  cancelForm() {
    this.showForm.set(false);
    this.editingId.set(null);
  }
  save() {
    const payload = {
      holidayDate: this.editDate?.toISOString().split("T")[0],
      nativeName: this.editNativeName,
      foreignName: this.editForeignName,
      year: this.editDate?.getFullYear()
    };
    const id = this.editingId();
    const action = id ? this.svc.updateHoliday(id, payload) : this.svc.createHoliday(payload);
    action.subscribe({
      next: () => {
        this.notify.success("Saved");
        this.cancelForm();
        this.load();
      },
      error: () => this.notify.error("Failed")
    });
  }
  confirmDelete(row) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Delete Holiday", message: `Delete "${row.nativeName}"?` }
    }).afterClosed().subscribe((ok) => {
      if (ok)
        this.svc.deleteHoliday(row.id).subscribe({
          next: () => {
            this.notify.success("Deleted");
            this.load();
          },
          error: () => this.notify.error("Failed")
        });
    });
  }
  static {
    this.\u0275fac = function HolidayListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HolidayListComponent)(\u0275\u0275directiveInject(SettingsService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HolidayListComponent, selectors: [["app-holiday-list"]], decls: 36, vars: 6, consts: [["dp", ""], [1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], [1, "flex", "gap-2"], ["appearance", "outline", 1, "w-28"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "mb-4", "border-2", "border-indigo-200"], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "no"], ["mat-header-cell", "", "class", "w-12", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "holidayDate"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-medium", 4, "matCellDef"], ["matColumnDef", "nativeName"], ["matColumnDef", "foreignName"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], [1, "text-base", "font-semibold", "mb-4"], [1, "grid", "grid-cols-3", "gap-4"], ["appearance", "outline"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matSuffix", "", 3, "for"], ["matInput", "", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2", "justify-end", "mt-2"], ["mat-stroked-button", "", 3, "click"], ["mat-header-cell", "", 1, "w-12"], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-medium"], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function HolidayListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
        \u0275\u0275text(3, "Holiday List");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "mat-form-field", 5)(6, "mat-label");
        \u0275\u0275text(7, "Year");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "mat-select", 6);
        \u0275\u0275twoWayListener("ngModelChange", function HolidayListComponent_Template_mat_select_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedYear, $event) || (ctx.selectedYear = $event);
          return $event;
        });
        \u0275\u0275listener("selectionChange", function HolidayListComponent_Template_mat_select_selectionChange_8_listener() {
          return ctx.load();
        });
        \u0275\u0275repeaterCreate(9, HolidayListComponent_For_10_Template, 2, 2, "mat-option", 7, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function HolidayListComponent_Template_button_click_11_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(12, "mat-icon");
        \u0275\u0275text(13, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(14, " Add Holiday ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(15, HolidayListComponent_Conditional_15_Template, 24, 6, "div", 9);
        \u0275\u0275elementStart(16, "div", 10)(17, "table", 11);
        \u0275\u0275elementContainerStart(18, 12);
        \u0275\u0275template(19, HolidayListComponent_th_19_Template, 2, 0, "th", 13)(20, HolidayListComponent_td_20_Template, 2, 1, "td", 14);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(21, 15);
        \u0275\u0275template(22, HolidayListComponent_th_22_Template, 2, 0, "th", 16)(23, HolidayListComponent_td_23_Template, 3, 4, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(24, 18);
        \u0275\u0275template(25, HolidayListComponent_th_25_Template, 2, 0, "th", 16)(26, HolidayListComponent_td_26_Template, 2, 1, "td", 14);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(27, 19);
        \u0275\u0275template(28, HolidayListComponent_th_28_Template, 2, 0, "th", 16)(29, HolidayListComponent_td_29_Template, 2, 1, "td", 14);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(30, 20);
        \u0275\u0275template(31, HolidayListComponent_th_31_Template, 2, 0, "th", 21)(32, HolidayListComponent_td_32_Template, 7, 0, "td", 14);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(33, HolidayListComponent_tr_33_Template, 1, 0, "tr", 22)(34, HolidayListComponent_tr_34_Template, 1, 0, "tr", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(35, HolidayListComponent_Conditional_35_Template, 2, 1, "div", 24);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedYear);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.years);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.showForm() ? 15 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.holidays());
        \u0275\u0275advance(16);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.holidays().length === 0 ? 35 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatNativeDateModule, MatDialogModule, MatTooltipModule, MatTooltip, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HolidayListComponent, [{
    type: Component,
    args: [{
      selector: "app-holiday-list",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTooltipModule
      ],
      template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Holiday List</h1>
        <div class="flex gap-2">
          <mat-form-field appearance="outline" class="w-28">
            <mat-label>Year</mat-label>
            <mat-select [(ngModel)]="selectedYear" (selectionChange)="load()">
              @for (y of years; track y) {
                <mat-option [value]="y">{{ y }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <button mat-flat-button color="primary" (click)="openForm()">
            <mat-icon>add</mat-icon> Add Holiday
          </button>
        </div>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4">
            {{ editingId() ? 'Edit' : 'Add' }} Holiday
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="dp" [(ngModel)]="editDate" />
              <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
              <mat-datepicker #dp></mat-datepicker>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Native Name</mat-label>
              <input matInput [(ngModel)]="editNativeName" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Foreign Name</mat-label>
              <input matInput [(ngModel)]="editForeignName" />
            </mat-form-field>
          </div>
          <div class="flex gap-2 justify-end mt-2">
            <button mat-stroked-button (click)="cancelForm()">Cancel</button>
            <button mat-flat-button color="primary" (click)="save()">Save</button>
          </div>
        </div>
      }

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="holidays()" class="w-full">
          <ng-container matColumnDef="no">
            <th mat-header-cell *matHeaderCellDef class="w-12">#</th>
            <td mat-cell *matCellDef="let row; let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="holidayDate">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let row" class="font-medium">{{ row.holidayDate | date:'dd MMMM yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="nativeName">
            <th mat-header-cell *matHeaderCellDef>Native Name</th>
            <td mat-cell *matCellDef="let row">{{ row.nativeName }}</td>
          </ng-container>
          <ng-container matColumnDef="foreignName">
            <th mat-header-cell *matHeaderCellDef>Foreign Name</th>
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '\u2014' }}</td>
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
        @if (holidays().length === 0) {
          <div class="text-center py-12 text-slate-400">No holidays for {{ selectedYear }}</div>
        }
      </div>
    </div>
  `
    }]
  }], () => [{ type: SettingsService }, { type: NotificationService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HolidayListComponent, { className: "HolidayListComponent", filePath: "src/app/features/settings/holiday/holiday-list/holiday-list.component.ts", lineNumber: 112 });
})();
export {
  HolidayListComponent
};
//# sourceMappingURL=chunk-BJNOH6PV.js.map
