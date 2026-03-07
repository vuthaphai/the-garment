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

// src/app/core/services/attendance.service.ts
var AttendanceService = class _AttendanceService {
  constructor(http) {
    this.http = http;
    this.base = `${environment.apiUrl}/attendance`;
  }
  // Shifts
  getShifts(search) {
    let params = new HttpParams();
    if (search)
      params = params.set("search", search);
    return this.http.get(`${this.base}/shifts`, { params });
  }
  getShift(id) {
    return this.http.get(`${this.base}/shifts/${id}`);
  }
  createShift(data) {
    return this.http.post(`${this.base}/shifts`, data);
  }
  updateShift(id, data) {
    return this.http.put(`${this.base}/shifts/${id}`, data);
  }
  deleteShift(id) {
    return this.http.delete(`${this.base}/shifts/${id}`);
  }
  // Controllers
  getControllers() {
    return this.http.get(`${this.base}/controllers`);
  }
  createController(data) {
    return this.http.post(`${this.base}/controllers`, data);
  }
  updateController(id, data) {
    return this.http.put(`${this.base}/controllers/${id}`, data);
  }
  deleteController(id) {
    return this.http.delete(`${this.base}/controllers/${id}`);
  }
  downloadData(controllerId) {
    return this.http.post(`${this.base}/download/${controllerId}`, {});
  }
  // Daily
  getDailyAttendance(empCardNo, dateFrom, dateTo, page = 0, size = 50) {
    let params = new HttpParams().set("page", page).set("size", size);
    if (empCardNo)
      params = params.set("empCardNo", empCardNo);
    if (dateFrom)
      params = params.set("dateFrom", dateFrom);
    if (dateTo)
      params = params.set("dateTo", dateTo);
    return this.http.get(`${this.base}/daily`, { params });
  }
  // Permissions
  getPermissions(empCardNo, dateFrom, dateTo, page = 0, size = 20) {
    let params = new HttpParams().set("page", page).set("size", size);
    if (empCardNo)
      params = params.set("empCardNo", empCardNo);
    if (dateFrom)
      params = params.set("dateFrom", dateFrom);
    if (dateTo)
      params = params.set("dateTo", dateTo);
    return this.http.get(`${this.base}/permissions`, { params });
  }
  createPermission(data) {
    return this.http.post(`${this.base}/permissions`, data);
  }
  updatePermission(id, data) {
    return this.http.put(`${this.base}/permissions/${id}`, data);
  }
  deletePermission(id) {
    return this.http.delete(`${this.base}/permissions/${id}`);
  }
  static {
    this.\u0275fac = function AttendanceService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AttendanceService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AttendanceService, factory: _AttendanceService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AttendanceService
};
//# sourceMappingURL=chunk-T2LL65DA.js.map
