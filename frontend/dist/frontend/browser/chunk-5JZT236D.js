import {
  AttendanceService
} from "./chunk-T2LL65DA.js";
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-Y7B74RYZ.js";

// src/app/features/attendance/shift/shift-list/shift-list.component.ts
function ShiftListComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r1 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r1 + 1);
  }
}
function ShiftListComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Native Name");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r2.nativeName);
  }
}
function ShiftListComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Foreign Name");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.foreignName || "\u2014");
  }
}
function ShiftListComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "Work Period");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind3(2, 2, row_r4.firstStart, "HH:mm", "UTC"), " \u2013 ", \u0275\u0275pipeBind3(3, 6, row_r4.firstEnd, "HH:mm", "UTC"), " ");
  }
}
function ShiftListComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 26);
    \u0275\u0275text(1, "OT1 %");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", row_r5.ot1Rate, "%");
  }
}
function ShiftListComponent_th_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ShiftListComponent_td_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 25)(1, "button", 29);
    \u0275\u0275listener("click", function ShiftListComponent_td_34_Template_button_click_1_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.openForm(row_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon", 30);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 31);
    \u0275\u0275listener("click", function ShiftListComponent_td_34_Template_button_click_4_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r7 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r7.confirmDelete(row_r7));
    });
    \u0275\u0275elementStart(5, "mat-icon", 32);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function ShiftListComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 33);
  }
}
function ShiftListComponent_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function ShiftListComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, "No shifts found");
    \u0275\u0275elementEnd();
  }
}
var ShiftListComponent = class _ShiftListComponent {
  constructor(svc, notify, dialog) {
    this.svc = svc;
    this.notify = notify;
    this.dialog = dialog;
    this.columns = ["no", "nativeName", "foreignName", "firstPeriod", "ot1Rate", "actions"];
    this.shifts = signal([], ...ngDevMode ? [{ debugName: "shifts" }] : []);
    this.search = "";
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.svc.getShifts(this.search).subscribe((res) => {
      if (res.success)
        this.shifts.set(res.data);
    });
  }
  openForm(shift) {
    this.notify.success("Shift form \u2013 coming soon (edit in API)");
  }
  confirmDelete(shift) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Delete Shift", message: `Delete "${shift.nativeName}"?` }
    }).afterClosed().subscribe((ok) => {
      if (ok)
        this.svc.deleteShift(shift.id).subscribe({
          next: () => {
            this.notify.success("Deleted");
            this.load();
          },
          error: () => this.notify.error("Failed")
        });
    });
  }
  static {
    this.\u0275fac = function ShiftListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShiftListComponent)(\u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShiftListComponent, selectors: [["app-shift-list"]], decls: 38, vars: 5, consts: [[1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "mb-4"], ["appearance", "outline", 1, "max-w-xs"], ["matInput", "", "placeholder", "Shift name...", 3, "ngModelChange", "keyup.enter", "ngModel"], ["matSuffix", ""], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "no"], ["mat-header-cell", "", "class", "w-12", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "nativeName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-medium", 4, "matCellDef"], ["matColumnDef", "foreignName"], ["matColumnDef", "firstPeriod"], ["matColumnDef", "ot1Rate"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], ["mat-header-cell", "", 1, "w-12"], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-medium"], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function ShiftListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Shift Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function ShiftListComponent_Template_button_click_4_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Add Shift ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "mat-form-field", 5)(10, "mat-label");
        \u0275\u0275text(11, "Search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ShiftListComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function ShiftListComponent_Template_input_keyup_enter_12_listener() {
          return ctx.load();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-icon", 7);
        \u0275\u0275text(14, "search");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "div", 8)(16, "table", 9);
        \u0275\u0275elementContainerStart(17, 10);
        \u0275\u0275template(18, ShiftListComponent_th_18_Template, 2, 0, "th", 11)(19, ShiftListComponent_td_19_Template, 2, 1, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(20, 13);
        \u0275\u0275template(21, ShiftListComponent_th_21_Template, 2, 0, "th", 14)(22, ShiftListComponent_td_22_Template, 2, 1, "td", 15);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(23, 16);
        \u0275\u0275template(24, ShiftListComponent_th_24_Template, 2, 0, "th", 14)(25, ShiftListComponent_td_25_Template, 2, 1, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(26, 17);
        \u0275\u0275template(27, ShiftListComponent_th_27_Template, 2, 0, "th", 14)(28, ShiftListComponent_td_28_Template, 4, 10, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(29, 18);
        \u0275\u0275template(30, ShiftListComponent_th_30_Template, 2, 0, "th", 14)(31, ShiftListComponent_td_31_Template, 2, 1, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(32, 19);
        \u0275\u0275template(33, ShiftListComponent_th_33_Template, 2, 0, "th", 20)(34, ShiftListComponent_td_34_Template, 7, 0, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(35, ShiftListComponent_tr_35_Template, 1, 0, "tr", 21)(36, ShiftListComponent_tr_36_Template, 1, 0, "tr", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(37, ShiftListComponent_Conditional_37_Template, 2, 0, "div", 23);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.search);
        \u0275\u0275advance(4);
        \u0275\u0275property("dataSource", ctx.shifts());
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.shifts().length === 0 ? 37 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatDialogModule, MatTooltipModule, MatTooltip, DatePipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShiftListComponent, [{
    type: Component,
    args: [{
      selector: "app-shift-list",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTooltipModule
      ],
      template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Shift Management</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Shift
        </button>
      </div>

      <div class="card mb-4">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="search" (keyup.enter)="load()" placeholder="Shift name..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="card p-0 overflow-hidden">
        <table mat-table [dataSource]="shifts()" class="w-full">
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
          <ng-container matColumnDef="firstPeriod">
            <th mat-header-cell *matHeaderCellDef>Work Period</th>
            <td mat-cell *matCellDef="let row">
              {{ row.firstStart | date:'HH:mm':'UTC' }} \u2013 {{ row.firstEnd | date:'HH:mm':'UTC' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="ot1Rate">
            <th mat-header-cell *matHeaderCellDef>OT1 %</th>
            <td mat-cell *matCellDef="let row">{{ row.ot1Rate }}%</td>
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
        @if (shifts().length === 0) {
          <div class="text-center py-12 text-slate-400">No shifts found</div>
        }
      </div>

      <!-- Inline quick form placeholder -->
    </div>
  `
    }]
  }], () => [{ type: AttendanceService }, { type: NotificationService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShiftListComponent, { className: "ShiftListComponent", filePath: "src/app/features/attendance/shift/shift-list/shift-list.component.ts", lineNumber: 86 });
})();
export {
  ShiftListComponent
};
//# sourceMappingURL=chunk-5JZT236D.js.map
