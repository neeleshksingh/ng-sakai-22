import { Component } from '@angular/core';
import { BaseMenuConfigComponent } from "src/app/global/components/base-menu-config/base-menu-config.component";
import { CLOUDBYTES_MENU } from 'src/app/shared/config/menu-configs/cloud-bytes-menu.config';
import { PermissionMenuItem } from 'src/app/shared/models/commons/permission-menu-item.model';

@Component({
  selector: 'app-cloud-bytes',
  standalone: true,
  imports: [BaseMenuConfigComponent],
  template: `
    <app-base-menu-config
      [menuConfig]="menuConfig"
      modulePath="cloudbytes"
      forbiddenRoute="/home/cloudbytes/forbidden-access">
    </app-base-menu-config>
  `,
  styleUrl: './cloud-bytes.component.scss'
})
export class CloudBytesComponent {
  menuConfig = CLOUDBYTES_MENU;
  ngOnInit(): void {
    this.injectPartnerCodeIntoMenu();
  }

  private injectPartnerCodeIntoMenu(): void {
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;

    let partnerCode: string | undefined;
    try {
      const user = JSON.parse(currentUserJson);
      partnerCode = user?.applicationUser?.partnerCode;
    } catch (e) {
      console.error('Failed to parse currentUser', e);
    }

    if (!partnerCode) return;

    const updatePartnerRoute = (items: PermissionMenuItem[]): void => {
      for (const item of items) {
        if (item.label === 'Partner' && item.routerLink?.[0]?.includes('partner-view')) {
          item.routerLink = [`/home/cloudbytes/company/partner/partner-view/${partnerCode}`];
          return;
        }
        if (item.items?.length) {
          updatePartnerRoute(item.items);
        }
      }
    };

    updatePartnerRoute(this.menuConfig);
  }
}