import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AttendanceDailyRecord, FingerPrinter, PagedResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private attendanceBase = `${environment.apiUrl}/attendance`;
  private fingerPrinterBase = `${environment.apiUrl}/finger-printers`;
  private reportBase = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  // Shifts
  getShifts(search?: string) {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<any[]>(`${this.attendanceBase}/shifts`, { params });
  }
  getShift(id: number) { return this.http.get<any>(`${this.attendanceBase}/shifts/${id}`); }
  createShift(data: any) { return this.http.post<any>(`${this.attendanceBase}/shifts`, data); }
  updateShift(id: number, data: any) { return this.http.put<any>(`${this.attendanceBase}/shifts/${id}`, data); }
  deleteShift(id: number) { return this.http.delete<void>(`${this.attendanceBase}/shifts/${id}`); }

  // Finger printers
  getFingerPrinters() { return this.http.get<FingerPrinter[]>(this.fingerPrinterBase); }
  getFingerPrinter(id: number) { return this.http.get<FingerPrinter>(`${this.fingerPrinterBase}/${id}`); }
  createFingerPrinter(data: Partial<FingerPrinter>) { return this.http.post<FingerPrinter>(this.fingerPrinterBase, data); }
  updateFingerPrinter(id: number, data: Partial<FingerPrinter>) { return this.http.put<FingerPrinter>(`${this.fingerPrinterBase}/${id}`, data); }
  deleteFingerPrinter(id: number) { return this.http.delete<void>(`${this.fingerPrinterBase}/${id}`); }
  downloadAttendanceData() { return this.http.post<string>(`${this.attendanceBase}/daily/download`, {}); }

  // Daily
  getDailyAttendance(empCardNo?: string, dateFrom?: string, dateTo?: string, page = 0, size = 50) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (empCardNo) params = params.set('empCardNo', empCardNo);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    return this.http.get<PagedResponse<AttendanceDailyRecord>>(`${this.attendanceBase}/daily`, { params });
  }

  getAttendanceSummaryReport(dateFrom?: string, dateTo?: string) {
    let params = new HttpParams();
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    return this.http.get<any>(`${this.reportBase}/attendance-summary`, { params });
  }

  // Permissions
  getPermissions(empCardNo?: string, dateFrom?: string, dateTo?: string, page = 0, size = 20) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (empCardNo) params = params.set('empCardNo', empCardNo);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    return this.http.get<any>(`${this.attendanceBase}/permissions`, { params });
  }
  createPermission(data: any) { return this.http.post<any>(`${this.attendanceBase}/permissions`, data); }
  updatePermission(id: number, data: any) { return this.http.put<any>(`${this.attendanceBase}/permissions/${id}`, data); }
  deletePermission(id: number) { return this.http.delete<void>(`${this.attendanceBase}/permissions/${id}`); }
}
