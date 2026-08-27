import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { SMALLBIZGURUS_MENU } from 'src/app/shared/config/menu-configs/smallbizgurus-menu.config';

@Component({
  selector: 'app-smallbizz-gurus',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="smallbizgurus"
      forbiddenRoute="/home/smallbizgurus/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './smallbizz-gurus.component.scss'
})
export class SmallbizzGurusComponent {
  menuConfig = SMALLBIZGURUS_MENU;
}