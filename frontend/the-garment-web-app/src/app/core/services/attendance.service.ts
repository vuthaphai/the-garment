import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private base = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  // Shifts
  getShifts(search?: string) {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<ApiResponse<any[]>>(`${this.base}/shifts`, { params });
  }
  getShift(id: number) { return this.http.get<ApiResponse<any>>(`${this.base}/shifts/${id}`); }
  createShift(data: any) { return this.http.post<ApiResponse<any>>(`${this.base}/shifts`, data); }
  updateShift(id: number, data: any) { return this.http.put<ApiResponse<any>>(`${this.base}/shifts/${id}`, data); }
  deleteShift(id: number) { return this.http.delete<ApiResponse<void>>(`${this.base}/shifts/${id}`); }

  // Controllers
  getControllers() { return this.http.get<ApiResponse<any[]>>(`${this.base}/controllers`); }
  createController(data: any) { return this.http.post<ApiResponse<any>>(`${this.base}/controllers`, data); }
  updateController(id: number, data: any) { return this.http.put<ApiResponse<any>>(`${this.base}/controllers/${id}`, data); }
  deleteController(id: number) { return this.http.delete<ApiResponse<void>>(`${this.base}/controllers/${id}`); }
  downloadData(controllerId: number) { return this.http.post<ApiResponse<string>>(`${this.base}/download/${controllerId}`, {}); }

  // Daily
  getDailyAttendance(empCardNo?: string, dateFrom?: string, dateTo?: string, page = 0, size = 50) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (empCardNo) params = params.set('empCardNo', empCardNo);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    return this.http.get<ApiResponse<any>>(`${this.base}/daily`, { params });
  }

  // Permissions
  getPermissions(empCardNo?: string, dateFrom?: string, dateTo?: string, page = 0, size = 20) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (empCardNo) params = params.set('empCardNo', empCardNo);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    return this.http.get<ApiResponse<any>>(`${this.base}/permissions`, { params });
  }
  createPermission(data: any) { return this.http.post<ApiResponse<any>>(`${this.base}/permissions`, data); }
  updatePermission(id: number, data: any) { return this.http.put<ApiResponse<any>>(`${this.base}/permissions/${id}`, data); }
  deletePermission(id: number) { return this.http.delete<ApiResponse<void>>(`${this.base}/permissions/${id}`); }
}
