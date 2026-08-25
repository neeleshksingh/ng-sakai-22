import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { EXECUTIVEEDGE_MENU } from 'src/app/shared/config/menu-configs/executive-edge-menu.config';

@Component({
  selector: 'app-executive-edge',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="executiveedge"
      forbiddenRoute="/home/executiveedge/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './executive-edge.component.scss'
})
export class ExecutiveEdgeComponent {
  menuConfig = EXECUTIVEEDGE_MENU;
}