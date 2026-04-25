export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  username: string;
  fullName: string;
  role: string;
  roles: string[];
}

export interface UserInfo {
  username: string;
  fullName: string;
  role: string;
  roles: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CurrentUserResponse {
  username: string;
  roles: string[];
}

export interface DashboardHomeResponse {
  username: string;
  roles: string[];
  widgets: string[];
}

export interface FingerPrinter {
  id: number;
  name?: string;
  machineName?: string;
  ipAddress?: string;
  port?: number;
  serialNumber?: string;
  location?: string;
  status?: string;
  machineType?: string;
}

export interface AttendanceDailyRecord {
  id?: number;
  empCardNo?: string;
  scanDate?: string;
  t1?: string;
  t2?: string;
  workingHours?: number | string;
  ot1?: string;
  ot2?: string;
  workDayType?: string;
  leaveType?: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages?: number;
  size?: number;
  number?: number;
}
