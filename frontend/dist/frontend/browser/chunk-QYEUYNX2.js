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
import "./chunk-W4NTCVPD.js";
import "./chunk-5OJCATJO.js";
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
  MatTableModule
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-Y7B74RYZ.js";

// src/app/features/attendance/daily/daily-attendance/daily-attendance.component.ts
function DailyAttendanceComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Card No");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r2.empCardNo);
  }
}
function DailyAttendanceComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, row_r3.scanDate, "dd/MM/yyyy"));
  }
}
function DailyAttendanceComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "T1");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.t1 || "\u2014");
  }
}
function DailyAttendanceComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "T2");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r5.t2 || "\u2014");
  }
}
function DailyAttendanceComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Work Hrs");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r6.workingHours);
  }
}
function DailyAttendanceComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "OT1");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r7.ot1 || "\u2014");
  }
}
function DailyAttendanceComponent_th_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "OT2");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r8.ot2 || "\u2014");
  }
}
function DailyAttendanceComponent_th_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Day Type");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r9.workDayType || "\u2014");
  }
}
function DailyAttendanceComponent_th_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 30);
    \u0275\u0275text(1, "Leave");
    \u0275\u0275elementEnd();
  }
}
function DailyAttendanceComponent_td_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r10.leaveType || "\u2014");
  }
}
function DailyAttendanceComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function DailyAttendanceComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function DailyAttendanceComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "No attendance records. Apply filters and search.");
    \u0275\u0275elementEnd();
  }
}
var DailyAttendanceComponent = class _DailyAttendanceComponent {
  constructor(svc) {
    this.svc = svc;
    this.columns = ["empCardNo", "scanDate", "t1", "t2", "workingHours", "ot1", "ot2", "workDayType", "leaveType"];
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
    this.empCardNo = "";
    this.dateFrom = null;
    this.dateTo = null;
  }
  load(page) {
    const fmt = (d) => d ? d.toISOString().split("T")[0] : void 0;
    this.svc.getDailyAttendance(this.empCardNo || void 0, fmt(this.dateFrom), fmt(this.dateTo), page).subscribe((res) => {
      if (res.success) {
        this.rows.set(res.data.content ?? []);
        this.total.set(res.data.totalElements ?? 0);
      }
    });
  }
  onPage(event) {
    this.load(event.pageIndex);
  }
  static {
    this.\u0275fac = function DailyAttendanceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DailyAttendanceComponent)(\u0275\u0275directiveInject(AttendanceService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DailyAttendanceComponent, selectors: [["app-daily-attendance"]], decls: 59, vars: 13, consts: [["fromPicker", ""], ["toPicker", ""], [1, "p-6"], [1, "page-title"], [1, "card", "mb-4", "flex", "gap-4", "flex-wrap", "items-end"], ["appearance", "outline", 1, "max-w-xs"], ["matInput", "", "placeholder", "Employee card no", 3, "ngModelChange", "ngModel"], ["appearance", "outline", 1, "w-44"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matSuffix", "", 3, "for"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "p-0", "overflow-hidden", "overflow-x-auto"], ["mat-table", "", 1, "w-full", "min-w-max", 3, "dataSource"], ["matColumnDef", "empCardNo"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-mono text-indigo-700", 4, "matCellDef"], ["matColumnDef", "scanDate"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "t1"], ["mat-cell", "", "class", "text-sm", 4, "matCellDef"], ["matColumnDef", "t2"], ["matColumnDef", "workingHours"], ["matColumnDef", "ot1"], ["matColumnDef", "ot2"], ["matColumnDef", "workDayType"], ["matColumnDef", "leaveType"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], ["showFirstLastButtons", "", 3, "page", "length", "pageSize"], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-mono", "text-indigo-700"], ["mat-cell", ""], ["mat-cell", "", 1, "text-sm"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function DailyAttendanceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "h1", 3);
        \u0275\u0275text(2, "Control Daily Data");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 4)(4, "mat-form-field", 5)(5, "mat-label");
        \u0275\u0275text(6, "Card No");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function DailyAttendanceComponent_Template_input_ngModelChange_7_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.empCardNo, $event) || (ctx.empCardNo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "mat-form-field", 7)(9, "mat-label");
        \u0275\u0275text(10, "From Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function DailyAttendanceComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.dateFrom, $event) || (ctx.dateFrom = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "mat-datepicker-toggle", 9)(13, "mat-datepicker", null, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-form-field", 7)(16, "mat-label");
        \u0275\u0275text(17, "To Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function DailyAttendanceComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.dateTo, $event) || (ctx.dateTo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "mat-datepicker-toggle", 9)(20, "mat-datepicker", null, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "button", 10);
        \u0275\u0275listener("click", function DailyAttendanceComponent_Template_button_click_22_listener() {
          return ctx.load(0);
        });
        \u0275\u0275elementStart(23, "mat-icon");
        \u0275\u0275text(24, "search");
        \u0275\u0275elementEnd();
        \u0275\u0275text(25, " Search ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 11)(27, "table", 12);
        \u0275\u0275elementContainerStart(28, 13);
        \u0275\u0275template(29, DailyAttendanceComponent_th_29_Template, 2, 0, "th", 14)(30, DailyAttendanceComponent_td_30_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(31, 16);
        \u0275\u0275template(32, DailyAttendanceComponent_th_32_Template, 2, 0, "th", 14)(33, DailyAttendanceComponent_td_33_Template, 3, 4, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(34, 18);
        \u0275\u0275template(35, DailyAttendanceComponent_th_35_Template, 2, 0, "th", 14)(36, DailyAttendanceComponent_td_36_Template, 2, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(37, 20);
        \u0275\u0275template(38, DailyAttendanceComponent_th_38_Template, 2, 0, "th", 14)(39, DailyAttendanceComponent_td_39_Template, 2, 1, "td", 19);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(40, 21);
        \u0275\u0275template(41, DailyAttendanceComponent_th_41_Template, 2, 0, "th", 14)(42, DailyAttendanceComponent_td_42_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(43, 22);
        \u0275\u0275template(44, DailyAttendanceComponent_th_44_Template, 2, 0, "th", 14)(45, DailyAttendanceComponent_td_45_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(46, 23);
        \u0275\u0275template(47, DailyAttendanceComponent_th_47_Template, 2, 0, "th", 14)(48, DailyAttendanceComponent_td_48_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(49, 24);
        \u0275\u0275template(50, DailyAttendanceComponent_th_50_Template, 2, 0, "th", 14)(51, DailyAttendanceComponent_td_51_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(52, 25);
        \u0275\u0275template(53, DailyAttendanceComponent_th_53_Template, 2, 0, "th", 14)(54, DailyAttendanceComponent_td_54_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(55, DailyAttendanceComponent_tr_55_Template, 1, 0, "tr", 26)(56, DailyAttendanceComponent_tr_56_Template, 1, 0, "tr", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(57, DailyAttendanceComponent_Conditional_57_Template, 2, 0, "div", 28);
        \u0275\u0275elementStart(58, "mat-paginator", 29);
        \u0275\u0275listener("page", function DailyAttendanceComponent_Template_mat_paginator_page_58_listener($event) {
          return ctx.onPage($event);
        });
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const fromPicker_r11 = \u0275\u0275reference(14);
        const toPicker_r12 = \u0275\u0275reference(21);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.empCardNo);
        \u0275\u0275advance(4);
        \u0275\u0275property("matDatepicker", fromPicker_r11);
        \u0275\u0275twoWayProperty("ngModel", ctx.dateFrom);
        \u0275\u0275advance();
        \u0275\u0275property("for", fromPicker_r11);
        \u0275\u0275advance(6);
        \u0275\u0275property("matDatepicker", toPicker_r12);
        \u0275\u0275twoWayProperty("ngModel", ctx.dateTo);
        \u0275\u0275advance();
        \u0275\u0275property("for", toPicker_r12);
        \u0275\u0275advance(8);
        \u0275\u0275property("dataSource", ctx.rows());
        \u0275\u0275advance(28);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.rows().length === 0 ? 57 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("length", ctx.total())("pageSize", 50);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatNativeDateModule, MatPaginatorModule, MatPaginator, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DailyAttendanceComponent, [{
    type: Component,
    args: [{
      selector: "app-daily-attendance",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
      ],
      template: `
    <div class="p-6">
      <h1 class="page-title">Control Daily Data</h1>

      <!-- Filters -->
      <div class="card mb-4 flex gap-4 flex-wrap items-end">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Card No</mat-label>
          <input matInput [(ngModel)]="empCardNo" placeholder="Employee card no" />
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

      <!-- Table -->
      <div class="card p-0 overflow-hidden overflow-x-auto">
        <table mat-table [dataSource]="rows()" class="w-full min-w-max">
          <ng-container matColumnDef="empCardNo">
            <th mat-header-cell *matHeaderCellDef>Card No</th>
            <td mat-cell *matCellDef="let row" class="font-mono text-indigo-700">{{ row.empCardNo }}</td>
          </ng-container>
          <ng-container matColumnDef="scanDate">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let row">{{ row.scanDate | date:'dd/MM/yyyy' }}</td>
          </ng-container>
          <ng-container matColumnDef="t1">
            <th mat-header-cell *matHeaderCellDef>T1</th>
            <td mat-cell *matCellDef="let row" class="text-sm">{{ row.t1 || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="t2">
            <th mat-header-cell *matHeaderCellDef>T2</th>
            <td mat-cell *matCellDef="let row" class="text-sm">{{ row.t2 || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="workingHours">
            <th mat-header-cell *matHeaderCellDef>Work Hrs</th>
            <td mat-cell *matCellDef="let row">{{ row.workingHours }}</td>
          </ng-container>
          <ng-container matColumnDef="ot1">
            <th mat-header-cell *matHeaderCellDef>OT1</th>
            <td mat-cell *matCellDef="let row">{{ row.ot1 || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="ot2">
            <th mat-header-cell *matHeaderCellDef>OT2</th>
            <td mat-cell *matCellDef="let row">{{ row.ot2 || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="workDayType">
            <th mat-header-cell *matHeaderCellDef>Day Type</th>
            <td mat-cell *matCellDef="let row">{{ row.workDayType || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="leaveType">
            <th mat-header-cell *matHeaderCellDef>Leave</th>
            <td mat-cell *matCellDef="let row">{{ row.leaveType || '\u2014' }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns" class="bg-slate-50"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="hover:bg-slate-50"></tr>
        </table>
        @if (rows().length === 0) {
          <div class="text-center py-12 text-slate-400">No attendance records. Apply filters and search.</div>
        }
        <mat-paginator
          [length]="total()"
          [pageSize]="50"
          (page)="onPage($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>
    </div>
  `
    }]
  }], () => [{ type: AttendanceService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DailyAttendanceComponent, { className: "DailyAttendanceComponent", filePath: "src/app/features/attendance/daily/daily-attendance/daily-attendance.component.ts", lineNumber: 103 });
})();
export {
  DailyAttendanceComponent
};
//# sourceMappingURL=chunk-QYEUYNX2.js.map
