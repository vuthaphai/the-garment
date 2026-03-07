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

// src/app/core/services/hr.service.ts
var HrService = class _HrService {
  constructor(http) {
    this.http = http;
    this.base = `${environment.apiUrl}/hr`;
  }
  // ---- Nationalities ----
  getNationalities(search) {
    let params = new HttpParams();
    if (search)
      params = params.set("search", search);
    return this.http.get(`${this.base}/nationalities`, { params });
  }
  createNationality(data) {
    return this.http.post(`${this.base}/nationalities`, data);
  }
  updateNationality(id, data) {
    return this.http.put(`${this.base}/nationalities/${id}`, data);
  }
  deleteNationality(id) {
    return this.http.delete(`${this.base}/nationalities/${id}`);
  }
  // ---- Positions ----
  getPositions(search) {
    let params = new HttpParams();
    if (search)
      params = params.set("search", search);
    return this.http.get(`${this.base}/positions`, { params });
  }
  createPosition(data) {
    return this.http.post(`${this.base}/positions`, data);
  }
  updatePosition(id, data) {
    return this.http.put(`${this.base}/positions/${id}`, data);
  }
  deletePosition(id) {
    return this.http.delete(`${this.base}/positions/${id}`);
  }
  // ---- Contract Types ----
  getContractTypes() {
    return this.http.get(`${this.base}/contract-types`);
  }
  createContractType(data) {
    return this.http.post(`${this.base}/contract-types`, data);
  }
  updateContractType(id, data) {
    return this.http.put(`${this.base}/contract-types/${id}`, data);
  }
  deleteContractType(id) {
    return this.http.delete(`${this.base}/contract-types/${id}`);
  }
  // ---- Group Positions ----
  getGroupPositions() {
    return this.http.get(`${this.base}/group-positions`);
  }
  getGroupPosition(id) {
    return this.http.get(`${this.base}/group-positions/${id}`);
  }
  createGroupPosition(data) {
    return this.http.post(`${this.base}/group-positions`, data);
  }
  updateGroupPosition(id, data) {
    return this.http.put(`${this.base}/group-positions/${id}`, data);
  }
  deleteGroupPosition(id) {
    return this.http.delete(`${this.base}/group-positions/${id}`);
  }
  // ---- Employees ----
  getEmployees(search, active, page = 0, size = 20) {
    let params = new HttpParams().set("page", page).set("size", size);
    if (search)
      params = params.set("search", search);
    if (active !== void 0)
      params = params.set("active", active);
    return this.http.get(`${this.base}/employees`, { params });
  }
  getEmployee(id) {
    return this.http.get(`${this.base}/employees/${id}`);
  }
  createEmployee(data) {
    return this.http.post(`${this.base}/employees`, data);
  }
  updateEmployee(id, data) {
    return this.http.put(`${this.base}/employees/${id}`, data);
  }
  deleteEmployee(id) {
    return this.http.delete(`${this.base}/employees/${id}`);
  }
  static {
    this.\u0275fac = function HrService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HrService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HrService, factory: _HrService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HrService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  HrService
};
//# sourceMappingURL=chunk-DGD4TA3G.js.map
