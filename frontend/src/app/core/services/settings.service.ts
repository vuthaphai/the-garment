import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private base = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  getCompanySettings() {
    return this.http.get<ApiResponse<any>>(`${this.base}/company`);
  }
  updateCompanySettings(data: any) {
    return this.http.put<ApiResponse<any>>(`${this.base}/company`, data);
  }

  getHolidays(year: number) {
    return this.http.get<ApiResponse<any[]>>(`${this.base}/holidays`, {
      params: new HttpParams().set('year', year)
    });
  }
  createHoliday(data: any) {
    return this.http.post<ApiResponse<any>>(`${this.base}/holidays`, data);
  }
  updateHoliday(id: number, data: any) {
    return this.http.put<ApiResponse<any>>(`${this.base}/holidays/${id}`, data);
  }
  deleteHoliday(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/holidays/${id}`);
  }
}
