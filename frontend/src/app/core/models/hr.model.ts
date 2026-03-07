export interface Nationality {
  id?: number;
  nativeName: string;
  foreignName?: string;
  description?: string;
}

export interface Position {
  id?: number;
  nativeName: string;
  foreignName?: string;
  description?: string;
}

export interface ContractType {
  id?: number;
  contractName: string;
  autoRule?: string;
  isAuto?: boolean;
  duration?: number;
  warning?: number;
}

export interface GroupPosition {
  id?: number;
  nativeName: string;
  foreignName?: string;
  description?: string;
  ot1?: boolean;
  ot2?: boolean;
  ot3?: boolean;
  payForOt1Food?: boolean;
  payForOt2Food?: boolean;
  payForOt3Food?: boolean;
  payForSaturday?: boolean;
  payForSunday?: boolean;
  payForHoliday?: boolean;
  shiftAllowance?: boolean;
  neverAbsence?: boolean;
  allowOtHalfHour?: boolean;
  attendanceAllowance?: number;
  goHomePercent?: number;
  pregnantDayAllowed?: number;
  endContract?: number;
  pregnantRate?: number;
  annualLeaveDayAllowed?: number;
  leaveIncreases?: LeaveIncrease[];
  seniorityBonuses?: SeniorityBonus[];
}

export interface LeaveIncrease {
  id?: number;
  year: number;
  days: number;
}

export interface SeniorityBonus {
  id?: number;
  year: number;
  amount?: number;
  percent?: number;
}

export interface Employee {
  id?: number;
  empCardNo?: string;
  serialCardNo?: string;
  nativeName?: string;
  foreignName?: string;
  dateOfBirth?: string;
  nationalityId?: number;
  nationalityName?: string;
  sex?: string;
  socialSecurity?: string;
  groupPositionId?: number;
  groupPositionName?: string;
  positionId?: number;
  positionName?: string;
  dateJoined?: string;
  dateResigned?: string;
  paymentType?: string;
  currency?: string;
  salary?: number;
  active?: boolean;
  contracts?: EmployeeContract[];
}

export interface EmployeeContract {
  id?: number;
  contractTypeId?: number;
  contractTypeName?: string;
  fromDate?: string;
  toDate?: string;
  months?: number;
}
