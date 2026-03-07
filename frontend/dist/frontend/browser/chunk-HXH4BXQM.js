import {
  AuthService,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-ODXN7PDN.js";
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Y7B74RYZ.js";

// src/app/layout/sidebar/sidebar.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.route;
function SidebarComponent_For_12_Conditional_0_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 19)(1, "mat-icon", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", child_r4.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(child_r4.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", child_r4.label, " ");
  }
}
function SidebarComponent_For_12_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, SidebarComponent_For_12_Conditional_0_Conditional_8_For_2_Template, 4, 3, "a", 19, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r2.children);
  }
}
function SidebarComponent_For_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "button", 14);
    \u0275\u0275listener("click", function SidebarComponent_For_12_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const item_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggle(item_r2.label));
    });
    \u0275\u0275elementStart(2, "mat-icon", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-icon", 17);
    \u0275\u0275text(7, " expand_more ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, SidebarComponent_For_12_Conditional_0_Conditional_8_Template, 3, 0, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("nav-parent-open", ctx_r2.isOpen(item_r2.label));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotated", ctx_r2.isOpen(item_r2.label));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.isOpen(item_r2.label) ? 8 : -1);
  }
}
function SidebarComponent_For_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 13)(1, "mat-icon", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r2.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.label);
  }
}
function SidebarComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidebarComponent_For_12_Conditional_0_Template, 9, 7, "div", 12)(1, SidebarComponent_For_12_Conditional_1_Template, 5, 3, "a", 13);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275conditional(item_r2.children ? 0 : 1);
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor(auth) {
    this.auth = auth;
    this.openMenus = signal(/* @__PURE__ */ new Set(["Human Resource"]), ...ngDevMode ? [{ debugName: "openMenus" }] : []);
    this.navItems = [
      {
        label: "Human Resource",
        icon: "people",
        children: [
          { label: "Employees", route: "/hr/employees", icon: "badge" },
          { label: "Nationalities", route: "/hr/nationalities", icon: "flag" },
          { label: "Positions", route: "/hr/positions", icon: "work" },
          { label: "Group Positions", route: "/hr/group-positions", icon: "groups" },
          { label: "Contract Types", route: "/hr/contract-types", icon: "description" }
        ]
      },
      {
        label: "Time Attendance",
        icon: "schedule",
        children: [
          { label: "Shifts", route: "/attendance/shifts", icon: "access_time" },
          { label: "Controllers", route: "/attendance/controllers", icon: "router" },
          { label: "Download Data", route: "/attendance/download", icon: "cloud_download" },
          { label: "Daily Data", route: "/attendance/daily", icon: "calendar_today" },
          { label: "Permissions", route: "/attendance/permissions", icon: "approval" }
        ]
      },
      { label: "Payroll", icon: "payments", route: "/payroll" },
      { label: "Reports", icon: "bar_chart", route: "/reports" },
      {
        label: "Settings",
        icon: "settings",
        children: [
          { label: "Company", route: "/settings/company", icon: "business" },
          { label: "Holidays", route: "/settings/holidays", icon: "beach_access" }
        ]
      }
    ];
  }
  toggle(label) {
    this.openMenus.update((set) => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }
  isOpen(label) {
    return this.openMenus().has(label);
  }
  userInitial() {
    return this.auth.currentUser()?.fullName?.charAt(0)?.toUpperCase() ?? "U";
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarComponent)(\u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 24, vars: 3, consts: [[1, "sidebar"], [1, "sidebar-logo"], [1, "sidebar-logo-icon"], [1, "sidebar-logo-title"], [1, "sidebar-logo-sub"], [1, "sidebar-nav"], [1, "sidebar-footer"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-role"], ["title", "Sign out", 1, "logout-btn", 3, "click"], [1, "nav-group"], ["routerLinkActive", "nav-item-active", 1, "nav-item", 3, "routerLink"], [1, "nav-item", "nav-parent", 3, "click"], [1, "nav-icon"], [1, "nav-label"], [1, "nav-chevron"], [1, "nav-children"], ["routerLinkActive", "nav-child-active", 1, "nav-child", 3, "routerLink"], [1, "nav-child-icon"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon");
        \u0275\u0275text(4, "factory");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div")(6, "p", 3);
        \u0275\u0275text(7, "The Garment");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 4);
        \u0275\u0275text(9, "HR & Attendance");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "nav", 5);
        \u0275\u0275repeaterCreate(11, SidebarComponent_For_12_Template, 2, 1, null, null, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6)(14, "div", 7);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 8)(17, "p", 9);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p", 10);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "button", 11);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_21_listener() {
          return ctx.auth.logout();
        });
        \u0275\u0275elementStart(22, "mat-icon");
        \u0275\u0275text(23, "logout");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        \u0275\u0275advance(11);
        \u0275\u0275repeater(ctx.navItems);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.userInitial());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate((tmp_2_0 = ctx.auth.currentUser()) == null ? null : tmp_2_0.fullName);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate((tmp_3_0 = ctx.auth.currentUser()) == null ? null : tmp_3_0.role);
      }
    }, dependencies: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatIcon], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 240px;\n  flex-shrink: 0;\n  height: 100vh;\n  background: var(--color-sidebar-bg, #0f172a);\n  color: white;\n  overflow: hidden;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .875rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-bottom: 1px solid rgba(255, 255, 255, .07);\n  flex-shrink: 0;\n}\n.sidebar-logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background: #6366f1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.sidebar-logo-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: white;\n}\n.sidebar-logo-title[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  font-weight: 700;\n  margin: 0;\n  letter-spacing: -.01em;\n}\n.sidebar-logo-sub[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  color: rgba(255, 255, 255, .45);\n  margin: 0;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: .75rem .75rem;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, .1);\n  border-radius: 2px;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .7rem;\n  width: 100%;\n  padding: .5rem .75rem;\n  border-radius: 8px;\n  font-size: .825rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, .6);\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  text-decoration: none;\n  transition: background .12s, color .12s;\n  margin-bottom: 2px;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .07);\n  color: rgba(255, 255, 255, .9);\n}\n.nav-item-active[_ngcontent-%COMP%] {\n  background: #6366f1 !important;\n  color: white !important;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.nav-label[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: left;\n}\n.nav-parent[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n.nav-parent-open[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .9);\n}\n.nav-chevron[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  transition: transform .2s;\n  color: rgba(255, 255, 255, .35);\n  margin-left: auto;\n}\n.nav-chevron.rotated[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.nav-group[_ngcontent-%COMP%] {\n  margin-bottom: 2px;\n}\n.nav-children[_ngcontent-%COMP%] {\n  margin: 2px 0 4px 0;\n  padding-left: .5rem;\n  border-left: 1px solid rgba(255, 255, 255, .08);\n  margin-left: 1.6rem;\n}\n.nav-child[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .6rem;\n  padding: .4rem .6rem;\n  border-radius: 6px;\n  font-size: .8rem;\n  color: rgba(255, 255, 255, .5);\n  text-decoration: none;\n  transition: background .12s, color .12s;\n  margin-bottom: 1px;\n}\n.nav-child[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .06);\n  color: rgba(255, 255, 255, .85);\n}\n.nav-child-active[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, .25) !important;\n  color: #a5b4fc !important;\n}\n.nav-child-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n  width: 15px;\n  height: 15px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n  padding: .875rem 1rem;\n  border-top: 1px solid rgba(255, 255, 255, .07);\n  flex-shrink: 0;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #6366f1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: .8rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 500;\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  color: rgba(255, 255, 255, .4);\n  margin: 0;\n  text-transform: capitalize;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: rgba(255, 255, 255, .35);\n  padding: .25rem;\n  border-radius: 6px;\n  display: flex;\n  transition: color .12s, background .12s;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  color: rgba(255, 255, 255, .8);\n  background: rgba(255, 255, 255, .08);\n}\n.logout-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=sidebar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule], template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">
          <mat-icon>factory</mat-icon>
        </div>
        <div>
          <p class="sidebar-logo-title">The Garment</p>
          <p class="sidebar-logo-sub">HR & Attendance</p>
        </div>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        @for (item of navItems; track item.label) {
          @if (item.children) {
            <div class="nav-group">
              <button
                (click)="toggle(item.label)"
                class="nav-item nav-parent"
                [class.nav-parent-open]="isOpen(item.label)"
              >
                <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
                <mat-icon class="nav-chevron" [class.rotated]="isOpen(item.label)">
                  expand_more
                </mat-icon>
              </button>
              @if (isOpen(item.label)) {
                <div class="nav-children">
                  @for (child of item.children; track child.route) {
                    <a
                      [routerLink]="child.route"
                      routerLinkActive="nav-child-active"
                      class="nav-child"
                    >
                      <mat-icon class="nav-child-icon">{{ child.icon }}</mat-icon>
                      {{ child.label }}
                    </a>
                  }
                </div>
              }
            </div>
          } @else {
            <a
              [routerLink]="item.route"
              routerLinkActive="nav-item-active"
              class="nav-item"
            >
              <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
              <span class="nav-label">{{ item.label }}</span>
            </a>
          }
        }
      </nav>

      <!-- User Footer -->
      <div class="sidebar-footer">
        <div class="user-avatar">{{ userInitial() }}</div>
        <div class="user-info">
          <p class="user-name">{{ auth.currentUser()?.fullName }}</p>
          <p class="user-role">{{ auth.currentUser()?.role }}</p>
        </div>
        <button class="logout-btn" (click)="auth.logout()" title="Sign out">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </aside>
  `, styles: ["/* angular:styles/component:css;213efbc17a23ba1dac3da891ccd29bcc77df54730fa78b9906ac534289eb1024;C:/Vp/dev/the-garment/frontend/src/app/layout/sidebar/sidebar.component.ts */\n.sidebar {\n  display: flex;\n  flex-direction: column;\n  width: 240px;\n  flex-shrink: 0;\n  height: 100vh;\n  background: var(--color-sidebar-bg, #0f172a);\n  color: white;\n  overflow: hidden;\n}\n.sidebar-logo {\n  display: flex;\n  align-items: center;\n  gap: .875rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-bottom: 1px solid rgba(255, 255, 255, .07);\n  flex-shrink: 0;\n}\n.sidebar-logo-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background: #6366f1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.sidebar-logo-icon mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: white;\n}\n.sidebar-logo-title {\n  font-size: .875rem;\n  font-weight: 700;\n  margin: 0;\n  letter-spacing: -.01em;\n}\n.sidebar-logo-sub {\n  font-size: .7rem;\n  color: rgba(255, 255, 255, .45);\n  margin: 0;\n}\n.sidebar-nav {\n  flex: 1;\n  overflow-y: auto;\n  padding: .75rem .75rem;\n}\n.sidebar-nav::-webkit-scrollbar {\n  width: 4px;\n}\n.sidebar-nav::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, .1);\n  border-radius: 2px;\n}\n.nav-item {\n  display: flex;\n  align-items: center;\n  gap: .7rem;\n  width: 100%;\n  padding: .5rem .75rem;\n  border-radius: 8px;\n  font-size: .825rem;\n  font-weight: 500;\n  color: rgba(255, 255, 255, .6);\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  text-decoration: none;\n  transition: background .12s, color .12s;\n  margin-bottom: 2px;\n}\n.nav-item:hover {\n  background: rgba(255, 255, 255, .07);\n  color: rgba(255, 255, 255, .9);\n}\n.nav-item-active {\n  background: #6366f1 !important;\n  color: white !important;\n}\n.nav-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.nav-label {\n  flex: 1;\n  text-align: left;\n}\n.nav-parent {\n  justify-content: flex-start;\n}\n.nav-parent-open {\n  color: rgba(255, 255, 255, .9);\n}\n.nav-chevron {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  transition: transform .2s;\n  color: rgba(255, 255, 255, .35);\n  margin-left: auto;\n}\n.nav-chevron.rotated {\n  transform: rotate(180deg);\n}\n.nav-group {\n  margin-bottom: 2px;\n}\n.nav-children {\n  margin: 2px 0 4px 0;\n  padding-left: .5rem;\n  border-left: 1px solid rgba(255, 255, 255, .08);\n  margin-left: 1.6rem;\n}\n.nav-child {\n  display: flex;\n  align-items: center;\n  gap: .6rem;\n  padding: .4rem .6rem;\n  border-radius: 6px;\n  font-size: .8rem;\n  color: rgba(255, 255, 255, .5);\n  text-decoration: none;\n  transition: background .12s, color .12s;\n  margin-bottom: 1px;\n}\n.nav-child:hover {\n  background: rgba(255, 255, 255, .06);\n  color: rgba(255, 255, 255, .85);\n}\n.nav-child-active {\n  background: rgba(99, 102, 241, .25) !important;\n  color: #a5b4fc !important;\n}\n.nav-child-icon {\n  font-size: 15px;\n  width: 15px;\n  height: 15px;\n}\n.sidebar-footer {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n  padding: .875rem 1rem;\n  border-top: 1px solid rgba(255, 255, 255, .07);\n  flex-shrink: 0;\n}\n.user-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #6366f1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: .8rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.user-info {\n  flex: 1;\n  min-width: 0;\n}\n.user-name {\n  font-size: .8rem;\n  font-weight: 500;\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role {\n  font-size: .7rem;\n  color: rgba(255, 255, 255, .4);\n  margin: 0;\n  text-transform: capitalize;\n}\n.logout-btn {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: rgba(255, 255, 255, .35);\n  padding: .25rem;\n  border-radius: 6px;\n  display: flex;\n  transition: color .12s, background .12s;\n}\n.logout-btn:hover {\n  color: rgba(255, 255, 255, .8);\n  background: rgba(255, 255, 255, .08);\n}\n.logout-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n"] }]
  }], () => [{ type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/layout/sidebar/sidebar.component.ts", lineNumber: 279 });
})();

// src/app/layout/main-layout/main-layout.component.ts
var MainLayoutComponent = class _MainLayoutComponent {
  static {
    this.\u0275fac = function MainLayoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MainLayoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayoutComponent, selectors: [["app-main-layout"]], decls: 5, vars: 0, consts: [[1, "app-shell"], [1, "app-content"], [1, "app-main"]], template: function MainLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-sidebar");
        \u0275\u0275elementStart(2, "div", 1)(3, "main", 2);
        \u0275\u0275element(4, "router-outlet");
        \u0275\u0275elementEnd()()();
      }
    }, dependencies: [RouterOutlet, SidebarComponent], styles: ["\n\n.app-shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n  background: var(--color-bg, #f1f5f9);\n}\n.app-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.app-main[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.75rem 2rem;\n}\n/*# sourceMappingURL=main-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-main-layout", standalone: true, imports: [RouterOutlet, SidebarComponent], template: `
    <div class="app-shell">
      <app-sidebar />
      <div class="app-content">
        <main class="app-main">
          <router-outlet />
        </main>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;26dfd6ec32e362a951065448de832cf912baba3902db0f93d464d7e3be447938;C:/Vp/dev/the-garment/frontend/src/app/layout/main-layout/main-layout.component.ts */\n.app-shell {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n  background: var(--color-bg, #f1f5f9);\n}\n.app-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.app-main {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.75rem 2rem;\n}\n/*# sourceMappingURL=main-layout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayoutComponent, { className: "MainLayoutComponent", filePath: "src/app/layout/main-layout/main-layout.component.ts", lineNumber: 39 });
})();
export {
  MainLayoutComponent
};
//# sourceMappingURL=chunk-HXH4BXQM.js.map
