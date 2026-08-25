import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { DEVELOPERS_MENU } from 'src/app/shared/config/menu-configs/developer-menu.config';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="developers"
      forbiddenRoute="/home/developers/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './developers.component.scss'
})
export class DevelopersComponent {
  menuConfig = DEVELOPERS_MENU;
}