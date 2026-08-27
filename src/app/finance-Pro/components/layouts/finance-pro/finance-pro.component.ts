import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from 'src/app/global/components/base-menu-config/base-menu-config.component';
import { FINANCE_PRO_MENU } from 'src/app/shared/config/menu-configs/finance-pro-menu.config';

@Component({
  selector: 'app-finance-pro',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="finpro"
      forbiddenRoute="/home/finpro/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './finance-pro.component.scss'
})
export class FinanceProComponent {
  menuConfig = FINANCE_PRO_MENU;
}