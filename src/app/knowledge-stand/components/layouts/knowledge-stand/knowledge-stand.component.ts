import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from 'src/app/global/components/base-menu-config/base-menu-config.component';
import { KNOWLEDGE_STAND_MENU } from 'src/app/shared/config/menu-configs/knowledge-stand-menu.config';

@Component({
  selector: 'app-knowledge-stand',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="knowledgestand"
      forbiddenRoute="/home/knowledgestand/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './knowledge-stand.component.scss'
})
export class KnowledgeStandComponent {
  menuConfig = KNOWLEDGE_STAND_MENU;
}