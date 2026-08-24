import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [AppMenuitem, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ul class="layout-menu" aria-label="Application modules">
        @for (item of model(); track item.label; let index = $index) {
            <li app-menuitem [item]="item" [root]="true" draggable="true" (dragstart)="startDrag(index)" (dragover)="allowDrop($event)" (drop)="dropAt(index)" (dragend)="endDrag()"></li>
        }
    </ul>`
})
export class AppMenu {
    private readonly storageKey = 'ncorepro-staff-menu-order';
    private draggedIndex: number | null = null;

    private readonly defaultModel: MenuItem[] = [
        { label: 'Dashboard', icon: 'fa-solid fa-home', routerLink: ['/home/dashboard'] },
        { label: 'Big Leads', icon: 'fa-solid fa-briefcase', routerLink: ['/home/bigleads/dashboard'] },
        { label: 'Mind Spark', icon: 'fa-solid fa-brain', routerLink: ['/home/mindspark/dashboard'] },
        { label: 'Knowledge Stand', icon: 'fa-solid fa-book-open', routerLink: ['/home/knowledgestand/dashboard'] },
        { label: 'Fin Pro', icon: 'fa-solid fa-indian-rupee-sign', routerLink: ['/home/finpro/dashboard'] },
        { label: 'SmallBiz Gurus', icon: 'fa-solid fa-handshake', routerLink: ['/home/smallbizgurus/dashboard'] },
        { label: 'Cloud Bytes', icon: 'fa-solid fa-cloud', routerLink: ['/home/cloudbytes/dashboard'] },
        { label: 'Executive Edge', icon: 'fa-solid fa-user-tie', routerLink: ['/home/executiveedge/dashboard'] },
        {
            label: 'More',
            icon: 'fa-solid fa-align-left',
            path: '/menu/more',
            items: [
                { label: 'Digital Fingers', icon: 'fa-solid fa-user-gear', routerLink: ['/home/digitalfingers/dashboard'] },
                { label: 'TimeClock Plus', icon: 'fa-solid fa-calendar-days', routerLink: ['/home/timeclockplus/dashboard'] },
                { label: 'Virtual Learn', icon: 'fa-solid fa-atlas', routerLink: ['/home/virtuallearn/dashboard'] },
                { label: 'Developers', icon: 'fa-solid fa-code', routerLink: ['/home/developers/dashboard'] },
                { label: 'Settings', icon: 'fa-solid fa-gear', routerLink: ['/home/settings/dashboard'] }
            ]
        }
    ];

    readonly model = signal<MenuItem[]>(this.restoreOrder());

    startDrag(index: number): void {
        this.draggedIndex = index;
    }

    allowDrop(event: DragEvent): void {
        event.preventDefault();
    }

    dropAt(targetIndex: number): void {
        if (this.draggedIndex === null || this.draggedIndex === targetIndex) return;

        const reordered = [...this.model()];
        const [draggedItem] = reordered.splice(this.draggedIndex, 1);
        reordered.splice(targetIndex, 0, draggedItem);
        this.model.set(reordered);
        this.draggedIndex = null;

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(reordered.map((item) => item.label)));
        } catch {
            // Reordering still works when browser storage is unavailable.
        }
    }

    endDrag(): void {
        this.draggedIndex = null;
    }

    private restoreOrder(): MenuItem[] {
        try {
            const labels = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as string[];
            const ordered = labels.map((label) => this.defaultModel.find((item) => item.label === label)).filter((item): item is MenuItem => !!item);
            const missing = this.defaultModel.filter((item) => !labels.includes(item.label ?? ''));
            return [...ordered, ...missing];
        } catch {
            return this.defaultModel;
        }
    }
}
