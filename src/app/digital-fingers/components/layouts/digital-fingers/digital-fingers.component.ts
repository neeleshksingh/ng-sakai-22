import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { DIGITALFINGERS_MENU } from 'src/app/shared/config/menu-configs/digital-fingers-menu.config';

@Component({
  selector: 'app-digital-fingers',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="digitalfingers"
      forbiddenRoute="/home/digitalfingers/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './digital-fingers.component.scss'
})
export class DigitalFingersComponent {
  menuConfig = DIGITALFINGERS_MENU;
}
