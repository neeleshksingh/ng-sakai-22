import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { BIGLEADS_MENU } from 'src/app/shared/config/menu-configs/big-leads-menu.config';

@Component({
  selector: 'app-big-leads',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="bigleads"
      forbiddenRoute="/home/bigleads/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './big-leads.component.scss'
})
export class BigLeadsComponent {
  menuConfig = BIGLEADS_MENU;
}