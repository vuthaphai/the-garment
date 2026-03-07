import {
  environment
} from "./chunk-OOR6T4LK.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-SHRFXLIA.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-Y7B74RYZ.js";

// src/app/core/services/settings.service.ts
var SettingsService = class _SettingsService {
  constructor(http) {
    this.http = http;
    this.base = `${environment.apiUrl}/settings`;
  }
  getCompanySettings() {
    return this.http.get(`${this.base}/company`);
  }
  updateCompanySettings(data) {
    return this.http.put(`${this.base}/company`, data);
  }
  getHolidays(year) {
    return this.http.get(`${this.base}/holidays`, {
      params: new HttpParams().set("year", year)
    });
  }
  createHoliday(data) {
    return this.http.post(`${this.base}/holidays`, data);
  }
  updateHoliday(id, data) {
    return this.http.put(`${this.base}/holidays/${id}`, data);
  }
  deleteHoliday(id) {
    return this.http.delete(`${this.base}/holidays/${id}`);
  }
  static {
    this.\u0275fac = function SettingsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SettingsService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SettingsService, factory: _SettingsService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SettingsService
};
//# sourceMappingURL=chunk-6RP6PD6F.js.map
