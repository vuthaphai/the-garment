import {
  MatIcon,
  MatIconModule
} from "./chunk-B4DS7WTO.js";
import "./chunk-SHRFXLIA.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-Y7B74RYZ.js";

// src/app/features/payroll/payroll.component.ts
var PayrollComponent = class _PayrollComponent {
  static {
    this.\u0275fac = function PayrollComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PayrollComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PayrollComponent, selectors: [["app-payroll"]], decls: 7, vars: 0, consts: [[1, "p-6", "flex", "flex-col", "items-center", "justify-center", "h-96", "text-slate-400"], [1, "text-6xl", "mb-4", 2, "font-size", "64px", "width", "64px", "height", "64px"], [1, "text-2xl", "font-semibold", "mb-2", "text-slate-600"], [1, "text-base"]], template: function PayrollComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-icon", 1);
        \u0275\u0275text(2, "payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "h2", 2);
        \u0275\u0275text(4, "Payroll");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Payroll calculation module \u2014 coming soon");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [MatIconModule, MatIcon], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PayrollComponent, [{
    type: Component,
    args: [{
      selector: "app-payroll",
      standalone: true,
      imports: [MatIconModule],
      template: `
    <div class="p-6 flex flex-col items-center justify-center h-96 text-slate-400">
      <mat-icon class="text-6xl mb-4" style="font-size:64px;width:64px;height:64px;">payments</mat-icon>
      <h2 class="text-2xl font-semibold mb-2 text-slate-600">Payroll</h2>
      <p class="text-base">Payroll calculation module \u2014 coming soon</p>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PayrollComponent, { className: "PayrollComponent", filePath: "src/app/features/payroll/payroll.component.ts", lineNumber: 16 });
})();
export {
  PayrollComponent
};
//# sourceMappingURL=chunk-EZX4ESCN.js.map
