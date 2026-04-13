import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="p-6 flex flex-col items-center justify-center h-96 text-slate-400">
      <mat-icon class="text-6xl mb-4" style="font-size:64px;width:64px;height:64px;">payments</mat-icon>
      <h2 class="text-2xl font-semibold mb-2 text-slate-600">Payroll</h2>
      <p class="text-base">Payroll calculation module — coming soon</p>
    </div>
  `
})
export class PayrollComponent {}
