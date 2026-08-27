import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { MINDSPARK_MENU } from 'src/app/shared/config/menu-configs/mind-spark-menu.config';

@Component({
  selector: 'app-mind-spark',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="mindspark"
      forbiddenRoute="/home/mindspark/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './mind-spark.component.scss'
})
export class MindSparkComponent {
  menuConfig = MINDSPARK_MENU;
}