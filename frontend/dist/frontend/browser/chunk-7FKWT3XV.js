import {
  HrService
} from "./chunk-DGD4TA3G.js";
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
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Y7B74RYZ.js";

// src/app/features/hr/position/position-list/position-list.component.ts
function PositionListComponent_Conditional_15_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "h3", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 24);
    \u0275\u0275listener("ngSubmit", function PositionListComponent_Conditional_15_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(4, "mat-form-field", 25)(5, "mat-label");
    \u0275\u0275text(6, "Native Name *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 26);
    \u0275\u0275conditionalCreate(8, PositionListComponent_Conditional_15_Conditional_8_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 25)(10, "mat-label");
    \u0275\u0275text(11, "Foreign Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-form-field", 25)(14, "mat-label");
    \u0275\u0275text(15, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 29)(18, "button", 30);
    \u0275\u0275listener("click", function PositionListComponent_Conditional_15_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(19, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 31);
    \u0275\u0275text(21, "Save");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId() ? "Edit Position" : "Add Position", " ");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.form.get("nativeName")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("nativeName")) == null ? null : tmp_3_0.touched) ? 8 : -1);
  }
}
function PositionListComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r3 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r3 + 1);
  }
}
function PositionListComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Native Name");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.nativeName);
  }
}
function PositionListComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Foreign Name");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r5.foreignName || "\u2014");
  }
}
function PositionListComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r6.description || "\u2014");
  }
}
function PositionListComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function PositionListComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 33)(1, "button", 36);
    \u0275\u0275listener("click", function PositionListComponent_td_32_Template_button_click_1_listener() {
      const row_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openForm(row_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon", 37);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 38);
    \u0275\u0275listener("click", function PositionListComponent_td_32_Template_button_click_4_listener() {
      const row_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(row_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon", 39);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function PositionListComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 40);
  }
}
function PositionListComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 41);
  }
}
function PositionListComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, "No positions found");
    \u0275\u0275elementEnd();
  }
}
var PositionListComponent = class _PositionListComponent {
  constructor(hrService, notify, dialog, fb) {
    this.hrService = hrService;
    this.notify = notify;
    this.dialog = dialog;
    this.fb = fb;
    this.columns = ["no", "nativeName", "foreignName", "description", "actions"];
    this.items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : []);
    this.form = this.fb.group({
      nativeName: ["", Validators.required],
      foreignName: [""],
      description: [""]
    });
  }
  ngOnInit() {
    this.load();
  }
  load(search) {
    this.hrService.getPositions(search).subscribe((res) => {
      if (res.success)
        this.items.set(res.data);
    });
  }
  onSearch(event) {
    this.load(event.target.value);
  }
  openForm(item) {
    this.showForm.set(true);
    this.editingId.set(item?.id ?? null);
    this.form.reset({ nativeName: item?.nativeName ?? "", foreignName: item?.foreignName ?? "", description: item?.description ?? "" });
  }
  cancel() {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset();
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.editingId();
    const action = id ? this.hrService.updatePosition(id, this.form.value) : this.hrService.createPosition(this.form.value);
    action.subscribe({
      next: () => {
        this.notify.success("Saved");
        this.cancel();
        this.load();
      },
      error: () => this.notify.error("Failed to save")
    });
  }
  confirmDelete(item) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Delete Position", message: `Delete "${item.nativeName}"?` }
    }).afterClosed().subscribe((confirmed) => {
      if (confirmed && item.id) {
        this.hrService.deletePosition(item.id).subscribe({
          next: () => {
            this.notify.success("Deleted");
            this.load();
          },
          error: () => this.notify.error("Failed to delete")
        });
      }
    });
  }
  static {
    this.\u0275fac = function PositionListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PositionListComponent)(\u0275\u0275directiveInject(HrService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PositionListComponent, selectors: [["app-position-list"]], decls: 36, vars: 5, consts: [[1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "mb-4"], ["appearance", "outline", 1, "max-w-xs"], ["matInput", "", "placeholder", "Search position...", 3, "input"], ["matSuffix", ""], [1, "card", "mb-4", "border-2", "border-indigo-200"], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "no"], ["mat-header-cell", "", "class", "w-12", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "nativeName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "foreignName"], ["matColumnDef", "description"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], [1, "text-base", "font-semibold", "mb-4", "text-slate-700"], [1, "grid", "grid-cols-3", "gap-4", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "nativeName"], ["matInput", "", "formControlName", "foreignName"], ["matInput", "", "formControlName", "description"], [1, "col-span-3", "flex", "gap-2", "justify-end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "submit"], ["mat-header-cell", "", 1, "w-12"], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function PositionListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Position");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function PositionListComponent_Template_button_click_4_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Add Position ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "mat-form-field", 5)(10, "mat-label");
        \u0275\u0275text(11, "Search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 6);
        \u0275\u0275listener("input", function PositionListComponent_Template_input_input_12_listener($event) {
          return ctx.onSearch($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "mat-icon", 7);
        \u0275\u0275text(14, "search");
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(15, PositionListComponent_Conditional_15_Template, 22, 3, "div", 8);
        \u0275\u0275elementStart(16, "div", 9)(17, "table", 10);
        \u0275\u0275elementContainerStart(18, 11);
        \u0275\u0275template(19, PositionListComponent_th_19_Template, 2, 0, "th", 12)(20, PositionListComponent_td_20_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(21, 14);
        \u0275\u0275template(22, PositionListComponent_th_22_Template, 2, 0, "th", 15)(23, PositionListComponent_td_23_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(24, 16);
        \u0275\u0275template(25, PositionListComponent_th_25_Template, 2, 0, "th", 15)(26, PositionListComponent_td_26_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(27, 17);
        \u0275\u0275template(28, PositionListComponent_th_28_Template, 2, 0, "th", 15)(29, PositionListComponent_td_29_Template, 2, 1, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(30, 18);
        \u0275\u0275template(31, PositionListComponent_th_31_Template, 2, 0, "th", 19)(32, PositionListComponent_td_32_Template, 7, 0, "td", 13);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(33, PositionListComponent_tr_33_Template, 1, 0, "tr", 20)(34, PositionListComponent_tr_34_Template, 1, 0, "tr", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(35, PositionListComponent_Conditional_35_Template, 2, 0, "div", 22);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275conditional(ctx.showForm() ? 15 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.items());
        \u0275\u0275advance(16);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.items().length === 0 ? 35 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatDialogModule, MatTooltipModule, MatTooltip], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PositionListComponent, [{
    type: Component,
    args: [{
      selector: "app-position-list",
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
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
        <h1 class="page-title">Position</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Position
        </button>
      </div>

      <div class="card mb-4">
        <mat-form-field appearance="outline" class="max-w-xs">
          <mat-label>Search</mat-label>
          <input matInput (input)="onSearch($event)" placeholder="Search position..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4 text-slate-700">
            {{ editingId() ? 'Edit Position' : 'Add Position' }}
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
            <td mat-cell *matCellDef="let row">{{ row.foreignName || '\u2014' }}</td>
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
        @if (items().length === 0) {
          <div class="text-center py-12 text-slate-400">No positions found</div>
        }
      </div>
    </div>
  `
    }]
  }], () => [{ type: HrService }, { type: NotificationService }, { type: MatDialog }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PositionListComponent, { className: "PositionListComponent", filePath: "src/app/features/hr/position/position-list/position-list.component.ts", lineNumber: 109 });
})();
export {
  PositionListComponent
};
//# sourceMappingURL=chunk-7FKWT3XV.js.map
