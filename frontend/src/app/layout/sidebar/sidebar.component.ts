import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: { label: string; route: string; icon: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">
          <mat-icon>factory</mat-icon>
        </div>
        <div>
          <p class="sidebar-logo-title">The Garment</p>
          <p class="sidebar-logo-sub">HR & Attendance</p>
        </div>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        @for (item of navItems; track item.label) {
          @if (item.children) {
            <div class="nav-group">
              <button
                (click)="toggle(item.label)"
                class="nav-item nav-parent"
                [class.nav-parent-open]="isOpen(item.label)"
              >
                <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
                <span class="nav-label">{{ item.label }}</span>
                <mat-icon class="nav-chevron" [class.rotated]="isOpen(item.label)">
                  expand_more
                </mat-icon>
              </button>
              @if (isOpen(item.label)) {
                <div class="nav-children">
                  @for (child of item.children; track child.route) {
                    <a
                      [routerLink]="child.route"
                      routerLinkActive="nav-child-active"
                      class="nav-child"
                    >
                      <mat-icon class="nav-child-icon">{{ child.icon }}</mat-icon>
                      {{ child.label }}
                    </a>
                  }
                </div>
              }
            </div>
          } @else {
            <a
              [routerLink]="item.route"
              routerLinkActive="nav-item-active"
              class="nav-item"
            >
              <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
              <span class="nav-label">{{ item.label }}</span>
            </a>
          }
        }
      </nav>

      <!-- User Footer -->
      <div class="sidebar-footer">
        <div class="user-avatar">{{ userInitial() }}</div>
        <div class="user-info">
          <p class="user-name">{{ auth.currentUser()?.fullName }}</p>
          <p class="user-role">{{ auth.currentUser()?.role }}</p>
        </div>
        <button class="logout-btn" (click)="auth.logout()" title="Sign out">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      display: flex;
      flex-direction: column;
      width: 240px;
      flex-shrink: 0;
      height: 100vh;
      background: var(--color-sidebar-bg, #0f172a);
      color: white;
      overflow: hidden;
    }

    /* Logo */
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: .875rem;
      padding: 1.25rem 1.25rem 1rem;
      border-bottom: 1px solid rgba(255,255,255,.07);
      flex-shrink: 0;
    }
    .sidebar-logo-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: #6366f1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .sidebar-logo-icon mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: white;
    }
    .sidebar-logo-title {
      font-size: .875rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -.01em;
    }
    .sidebar-logo-sub {
      font-size: .7rem;
      color: rgba(255,255,255,.45);
      margin: 0;
    }

    /* Nav */
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: .75rem .75rem;
    }
    .sidebar-nav::-webkit-scrollbar { width: 4px; }
    .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }

    .nav-item {
      display: flex;
      align-items: center;
      gap: .7rem;
      width: 100%;
      padding: .5rem .75rem;
      border-radius: 8px;
      font-size: .825rem;
      font-weight: 500;
      color: rgba(255,255,255,.6);
      cursor: pointer;
      border: none;
      background: transparent;
      text-decoration: none;
      transition: background .12s, color .12s;
      margin-bottom: 2px;
    }
    .nav-item:hover {
      background: rgba(255,255,255,.07);
      color: rgba(255,255,255,.9);
    }
    .nav-item-active {
      background: #6366f1 !important;
      color: white !important;
    }
    .nav-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    .nav-label { flex: 1; text-align: left; }

    /* Parent nav item */
    .nav-parent { justify-content: flex-start; }
    .nav-parent-open { color: rgba(255,255,255,.9); }
    .nav-chevron {
      font-size: 16px;
      width: 16px;
      height: 16px;
      transition: transform .2s;
      color: rgba(255,255,255,.35);
      margin-left: auto;
    }
    .nav-chevron.rotated { transform: rotate(180deg); }

    /* Children */
    .nav-group { margin-bottom: 2px; }
    .nav-children {
      margin: 2px 0 4px 0;
      padding-left: .5rem;
      border-left: 1px solid rgba(255,255,255,.08);
      margin-left: 1.6rem;
    }
    .nav-child {
      display: flex;
      align-items: center;
      gap: .6rem;
      padding: .4rem .6rem;
      border-radius: 6px;
      font-size: .8rem;
      color: rgba(255,255,255,.5);
      text-decoration: none;
      transition: background .12s, color .12s;
      margin-bottom: 1px;
    }
    .nav-child:hover {
      background: rgba(255,255,255,.06);
      color: rgba(255,255,255,.85);
    }
    .nav-child-active {
      background: rgba(99,102,241,.25) !important;
      color: #a5b4fc !important;
    }
    .nav-child-icon {
      font-size: 15px;
      width: 15px;
      height: 15px;
    }

    /* Footer */
    .sidebar-footer {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding: .875rem 1rem;
      border-top: 1px solid rgba(255,255,255,.07);
      flex-shrink: 0;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #6366f1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .8rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .user-info { flex: 1; min-width: 0; }
    .user-name {
      font-size: .8rem;
      font-weight: 500;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-role {
      font-size: .7rem;
      color: rgba(255,255,255,.4);
      margin: 0;
      text-transform: capitalize;
    }
    .logout-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: rgba(255,255,255,.35);
      padding: .25rem;
      border-radius: 6px;
      display: flex;
      transition: color .12s, background .12s;
    }
    .logout-btn:hover {
      color: rgba(255,255,255,.8);
      background: rgba(255,255,255,.08);
    }
    .logout-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
  `]
})
export class SidebarComponent {
  openMenus = signal<Set<string>>(new Set(['Human Resource']));

  navItems: NavItem[] = [
    {
      label: 'Human Resource',
      icon: 'people',
      children: [
        { label: 'Employees', route: '/hr/employees', icon: 'badge' },
        { label: 'Nationalities', route: '/hr/nationalities', icon: 'flag' },
        { label: 'Positions', route: '/hr/positions', icon: 'work' },
        { label: 'Group Positions', route: '/hr/group-positions', icon: 'groups' },
        { label: 'Contract Types', route: '/hr/contract-types', icon: 'description' }
      ]
    },
    {
      label: 'Time Attendance',
      icon: 'schedule',
      children: [
        { label: 'Shifts', route: '/attendance/shifts', icon: 'access_time' },
        { label: 'Controllers', route: '/attendance/controllers', icon: 'router' },
        { label: 'Download Data', route: '/attendance/download', icon: 'cloud_download' },
        { label: 'Daily Data', route: '/attendance/daily', icon: 'calendar_today' },
        { label: 'Permissions', route: '/attendance/permissions', icon: 'approval' }
      ]
    },
    { label: 'Payroll', icon: 'payments', route: '/payroll' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Company', route: '/settings/company', icon: 'business' },
        { label: 'Holidays', route: '/settings/holidays', icon: 'beach_access' }
      ]
    }
  ];

  constructor(public auth: AuthService) {}

  toggle(label: string) {
    this.openMenus.update(set => {
      const next = new Set(set);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  isOpen(label: string) {
    return this.openMenus().has(label);
  }

  userInitial() {
    return this.auth.currentUser()?.fullName?.charAt(0)?.toUpperCase() ?? 'U';
  }
}
