import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'hr',
        children: [
          {
            path: 'employees',
            loadComponent: () =>
              import('./features/hr/employees/employee-list/employee-list.component')
                .then(m => m.EmployeeListComponent)
          },
          {
            path: 'nationalities',
            loadComponent: () =>
              import('./features/hr/nationality/nationality-list/nationality-list.component')
                .then(m => m.NationalityListComponent)
          },
          {
            path: 'positions',
            loadComponent: () =>
              import('./features/hr/position/position-list/position-list.component')
                .then(m => m.PositionListComponent)
          },
          {
            path: 'group-positions',
            loadComponent: () =>
              import('./features/hr/group-position/group-position-list/group-position-list.component')
                .then(m => m.GroupPositionListComponent)
          },
          {
            path: 'contract-types',
            loadComponent: () =>
              import('./features/hr/contract-type/contract-type-list/contract-type-list.component')
                .then(m => m.ContractTypeListComponent)
          }
        ]
      },
      {
        path: 'attendance',
        children: [
          {
            path: 'controllers',
            loadComponent: () =>
              import('./features/attendance/controller/controller-list/controller-list.component')
                .then(m => m.ControllerListComponent)
          },
          {
            path: 'download',
            loadComponent: () =>
              import('./features/attendance/download/download.component')
                .then(m => m.DownloadComponent)
          },
          {
            path: 'daily',
            loadComponent: () =>
              import('./features/attendance/daily/daily-attendance/daily-attendance.component')
                .then(m => m.DailyAttendanceComponent)
          }
        ]
      },
      {
        path: 'payroll',
        loadComponent: () =>
          import('./features/payroll/payroll.component').then(m => m.PayrollComponent)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        children: [
          {
            path: 'holidays',
            loadComponent: () =>
              import('./features/settings/holiday/holiday-list/holiday-list.component')
                .then(m => m.HolidayListComponent)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
