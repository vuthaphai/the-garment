import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.model';
import { Nationality, Position, ContractType, GroupPosition, Employee } from '../models/hr.model';

@Injectable({ providedIn: 'root' })
export class HrService {
  private base = `${environment.apiUrl}/hr`;

  constructor(private http: HttpClient) {}

  // ---- Nationalities ----
  getNationalities(search?: string) {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<ApiResponse<Nationality[]>>(`${this.base}/nationalities`, { params });
  }
  createNationality(data: Nationality) {
    return this.http.post<ApiResponse<Nationality>>(`${this.base}/nationalities`, data);
  }
  updateNationality(id: number, data: Nationality) {
    return this.http.put<ApiResponse<Nationality>>(`${this.base}/nationalities/${id}`, data);
  }
  deleteNationality(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/nationalities/${id}`);
  }

  // ---- Positions ----
  getPositions(search?: string) {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<ApiResponse<Position[]>>(`${this.base}/positions`, { params });
  }
  createPosition(data: Position) {
    return this.http.post<ApiResponse<Position>>(`${this.base}/positions`, data);
  }
  updatePosition(id: number, data: Position) {
    return this.http.put<ApiResponse<Position>>(`${this.base}/positions/${id}`, data);
  }
  deletePosition(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/positions/${id}`);
  }

  // ---- Contract Types ----
  getContractTypes() {
    return this.http.get<ApiResponse<ContractType[]>>(`${this.base}/contract-types`);
  }
  createContractType(data: ContractType) {
    return this.http.post<ApiResponse<ContractType>>(`${this.base}/contract-types`, data);
  }
  updateContractType(id: number, data: ContractType) {
    return this.http.put<ApiResponse<ContractType>>(`${this.base}/contract-types/${id}`, data);
  }
  deleteContractType(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/contract-types/${id}`);
  }

  // ---- Group Positions ----
  getGroupPositions() {
    return this.http.get<ApiResponse<GroupPosition[]>>(`${this.base}/group-positions`);
  }
  getGroupPosition(id: number) {
    return this.http.get<ApiResponse<GroupPosition>>(`${this.base}/group-positions/${id}`);
  }
  createGroupPosition(data: GroupPosition) {
    return this.http.post<ApiResponse<GroupPosition>>(`${this.base}/group-positions`, data);
  }
  updateGroupPosition(id: number, data: GroupPosition) {
    return this.http.put<ApiResponse<GroupPosition>>(`${this.base}/group-positions/${id}`, data);
  }
  deleteGroupPosition(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/group-positions/${id}`);
  }

  // ---- Employees ----
  getEmployees(search?: string, active?: boolean, page = 0, size = 20) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (search) params = params.set('search', search);
    if (active !== undefined) params = params.set('active', active);
    return this.http.get<ApiResponse<any>>(`${this.base}/employees`, { params });
  }
  getEmployee(id: number) {
    return this.http.get<ApiResponse<Employee>>(`${this.base}/employees/${id}`);
  }
  createEmployee(data: Employee) {
    return this.http.post<ApiResponse<Employee>>(`${this.base}/employees`, data);
  }
  updateEmployee(id: number, data: Employee) {
    return this.http.put<ApiResponse<Employee>>(`${this.base}/employees/${id}`, data);
  }
  deleteEmployee(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/employees/${id}`);
  }
}
