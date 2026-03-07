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
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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

// src/app/features/hr/contract-type/contract-type-list/contract-type-list.component.ts
function ContractTypeListComponent_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "h3", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 23);
    \u0275\u0275listener("ngSubmit", function ContractTypeListComponent_Conditional_8_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(4, "mat-form-field", 24)(5, "mat-label");
    \u0275\u0275text(6, "Contract Name *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 25);
    \u0275\u0275conditionalCreate(8, ContractTypeListComponent_Conditional_8_Conditional_8_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 24)(10, "mat-label");
    \u0275\u0275text(11, "Auto Rule");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-form-field", 24)(14, "mat-label");
    \u0275\u0275text(15, "Duration (months)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-form-field", 24)(18, "mat-label");
    \u0275\u0275text(19, "Warning (days before)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 29)(22, "mat-checkbox", 30);
    \u0275\u0275text(23, "Auto renew");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 31)(25, "button", 32);
    \u0275\u0275listener("click", function ContractTypeListComponent_Conditional_8_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(26, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 33);
    \u0275\u0275text(28, "Save");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId() ? "Edit" : "Add", " Contract Type ");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.form.get("contractName")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("contractName")) == null ? null : tmp_3_0.touched) ? 8 : -1);
  }
}
function ContractTypeListComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r3 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(i_r3 + 1);
  }
}
function ContractTypeListComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.contractName);
  }
}
function ContractTypeListComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Auto Rule");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r5.autoRule || "\u2014");
  }
}
function ContractTypeListComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Duration");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r6.duration ? row_r6.duration + " months" : "\u2014");
  }
}
function ContractTypeListComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Warning");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r7.warning ? row_r7.warning + " days" : "\u2014");
  }
}
function ContractTypeListComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 36);
    \u0275\u0275text(1, "Auto");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(row_r8.isAuto ? "text-green-500" : "text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r8.isAuto ? "check_circle" : "cancel", " ");
  }
}
function ContractTypeListComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ContractTypeListComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 35)(1, "button", 39);
    \u0275\u0275listener("click", function ContractTypeListComponent_td_31_Template_button_click_1_listener() {
      const row_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openForm(row_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon", 40);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 41);
    \u0275\u0275listener("click", function ContractTypeListComponent_td_31_Template_button_click_4_listener() {
      const row_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(row_r10));
    });
    \u0275\u0275elementStart(5, "mat-icon", 42);
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function ContractTypeListComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 43);
  }
}
function ContractTypeListComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 44);
  }
}
function ContractTypeListComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1, "No contract types found");
    \u0275\u0275elementEnd();
  }
}
var ContractTypeListComponent = class _ContractTypeListComponent {
  constructor(hrService, notify, dialog, fb) {
    this.hrService = hrService;
    this.notify = notify;
    this.dialog = dialog;
    this.fb = fb;
    this.columns = ["no", "contractName", "autoRule", "duration", "warning", "isAuto", "actions"];
    this.items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : []);
    this.form = this.fb.group({
      contractName: ["", Validators.required],
      autoRule: [""],
      duration: [null],
      warning: [null],
      isAuto: [false]
    });
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.hrService.getContractTypes().subscribe((res) => {
      if (res.success)
        this.items.set(res.data);
    });
  }
  openForm(item) {
    this.showForm.set(true);
    this.editingId.set(item?.id ?? null);
    this.form.reset({
      contractName: item?.contractName ?? "",
      autoRule: item?.autoRule ?? "",
      duration: item?.duration ?? null,
      warning: item?.warning ?? null,
      isAuto: item?.isAuto ?? false
    });
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
    const action = id ? this.hrService.updateContractType(id, this.form.value) : this.hrService.createContractType(this.form.value);
    action.subscribe({ next: () => {
      this.notify.success("Saved");
      this.cancel();
      this.load();
    }, error: () => this.notify.error("Failed") });
  }
  confirmDelete(item) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: "Delete", message: `Delete "${item.contractName}"?` } }).afterClosed().subscribe((ok) => {
      if (ok && item.id)
        this.hrService.deleteContractType(item.id).subscribe({ next: () => {
          this.notify.success("Deleted");
          this.load();
        }, error: () => this.notify.error("Failed") });
    });
  }
  static {
    this.\u0275fac = function ContractTypeListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ContractTypeListComponent)(\u0275\u0275directiveInject(HrService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractTypeListComponent, selectors: [["app-contract-type-list"]], decls: 35, vars: 5, consts: [[1, "p-6"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "page-title"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "card", "mb-4", "border-2", "border-indigo-200"], [1, "card", "p-0", "overflow-hidden"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "no"], ["mat-header-cell", "", "class", "w-12", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "contractName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-medium", 4, "matCellDef"], ["matColumnDef", "autoRule"], ["matColumnDef", "duration"], ["matColumnDef", "warning"], ["matColumnDef", "isAuto"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "w-24", 4, "matHeaderCellDef"], ["mat-header-row", "", "class", "bg-slate-50", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50", 4, "matRowDef", "matRowDefColumns"], [1, "text-center", "py-12", "text-slate-400"], [1, "text-base", "font-semibold", "mb-4", "text-slate-700"], [1, "grid", "grid-cols-2", "gap-4", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "contractName"], ["matInput", "", "formControlName", "autoRule"], ["matInput", "", "type", "number", "formControlName", "duration"], ["matInput", "", "type", "number", "formControlName", "warning"], [1, "flex", "items-center"], ["formControlName", "isAuto"], [1, "col-span-2", "flex", "gap-2", "justify-end"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "submit"], ["mat-header-cell", "", 1, "w-12"], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-cell", "", 1, "font-medium"], ["mat-header-cell", "", 1, "w-24"], ["mat-icon-button", "", "matTooltip", "Edit", 3, "click"], [1, "text-slate-500"], ["mat-icon-button", "", "matTooltip", "Delete", 3, "click"], [1, "text-red-400"], ["mat-header-row", "", 1, "bg-slate-50"], ["mat-row", "", 1, "hover:bg-slate-50"]], template: function ContractTypeListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Type of Contract");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function ContractTypeListComponent_Template_button_click_4_listener() {
          return ctx.openForm();
        });
        \u0275\u0275elementStart(5, "mat-icon");
        \u0275\u0275text(6, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Add Contract Type ");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(8, ContractTypeListComponent_Conditional_8_Template, 29, 3, "div", 4);
        \u0275\u0275elementStart(9, "div", 5)(10, "table", 6);
        \u0275\u0275elementContainerStart(11, 7);
        \u0275\u0275template(12, ContractTypeListComponent_th_12_Template, 2, 0, "th", 8)(13, ContractTypeListComponent_td_13_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(14, 10);
        \u0275\u0275template(15, ContractTypeListComponent_th_15_Template, 2, 0, "th", 11)(16, ContractTypeListComponent_td_16_Template, 2, 1, "td", 12);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(17, 13);
        \u0275\u0275template(18, ContractTypeListComponent_th_18_Template, 2, 0, "th", 11)(19, ContractTypeListComponent_td_19_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(20, 14);
        \u0275\u0275template(21, ContractTypeListComponent_th_21_Template, 2, 0, "th", 11)(22, ContractTypeListComponent_td_22_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(23, 15);
        \u0275\u0275template(24, ContractTypeListComponent_th_24_Template, 2, 0, "th", 11)(25, ContractTypeListComponent_td_25_Template, 2, 1, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(26, 16);
        \u0275\u0275template(27, ContractTypeListComponent_th_27_Template, 2, 0, "th", 11)(28, ContractTypeListComponent_td_28_Template, 3, 3, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(29, 17);
        \u0275\u0275template(30, ContractTypeListComponent_th_30_Template, 2, 0, "th", 18)(31, ContractTypeListComponent_td_31_Template, 7, 0, "td", 9);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(32, ContractTypeListComponent_tr_32_Template, 1, 0, "tr", 19)(33, ContractTypeListComponent_tr_33_Template, 1, 0, "tr", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(34, ContractTypeListComponent_Conditional_34_Template, 2, 0, "div", 21);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.showForm() ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.items());
        \u0275\u0275advance(22);
        \u0275\u0275property("matHeaderRowDef", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.columns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.items().length === 0 ? 34 : -1);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatError, MatInputModule, MatInput, MatCheckboxModule, MatCheckbox, MatDialogModule, MatTooltipModule, MatTooltip], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractTypeListComponent, [{
    type: Component,
    args: [{
      selector: "app-contract-type-list",
      standalone: true,
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTooltipModule
      ],
      template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="page-title">Type of Contract</h1>
        <button mat-flat-button color="primary" (click)="openForm()">
          <mat-icon>add</mat-icon> Add Contract Type
        </button>
      </div>

      @if (showForm()) {
        <div class="card mb-4 border-2 border-indigo-200">
          <h3 class="text-base font-semibold mb-4 text-slate-700">
            {{ editingId() ? 'Edit' : 'Add' }} Contract Type
          </h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="grid grid-cols-2 gap-4">
            <mat-form-field appearance="outline">
              <mat-label>Contract Name *</mat-label>
              <input matInput formControlName="contractName" />
              @if (form.get('contractName')?.invalid && form.get('contractName')?.touched) {
                <mat-error>Required</mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Auto Rule</mat-label>
              <input matInput formControlName="autoRule" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Duration (months)</mat-label>
              <input matInput type="number" formControlName="duration" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Warning (days before)</mat-label>
              <input matInput type="number" formControlName="warning" />
            </mat-form-field>
            <div class="flex items-center">
              <mat-checkbox formControlName="isAuto">Auto renew</mat-checkbox>
            </div>
            <div class="col-span-2 flex gap-2 justify-end">
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
          <ng-container matColumnDef="contractName">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row" class="font-medium">{{ row.contractName }}</td>
          </ng-container>
          <ng-container matColumnDef="autoRule">
            <th mat-header-cell *matHeaderCellDef>Auto Rule</th>
            <td mat-cell *matCellDef="let row">{{ row.autoRule || '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="duration">
            <th mat-header-cell *matHeaderCellDef>Duration</th>
            <td mat-cell *matCellDef="let row">{{ row.duration ? row.duration + ' months' : '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="warning">
            <th mat-header-cell *matHeaderCellDef>Warning</th>
            <td mat-cell *matCellDef="let row">{{ row.warning ? row.warning + ' days' : '\u2014' }}</td>
          </ng-container>
          <ng-container matColumnDef="isAuto">
            <th mat-header-cell *matHeaderCellDef>Auto</th>
            <td mat-cell *matCellDef="let row">
              <mat-icon [class]="row.isAuto ? 'text-green-500' : 'text-slate-300'">
                {{ row.isAuto ? 'check_circle' : 'cancel' }}
              </mat-icon>
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
          <div class="text-center py-12 text-slate-400">No contract types found</div>
        }
      </div>
    </div>
  `
    }]
  }], () => [{ type: HrService }, { type: NotificationService }, { type: MatDialog }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractTypeListComponent, { className: "ContractTypeListComponent", filePath: "src/app/features/hr/contract-type/contract-type-list/contract-type-list.component.ts", lineNumber: 122 });
})();
export {
  ContractTypeListComponent
};
//# sourceMappingURL=chunk-2AYUIWZN.js.map
