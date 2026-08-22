import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AppBreadcrumb } from './app.breadcrumb';
import { AppConfigurator } from './app.configurator';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [FormsModule, RouterModule, InputTextModule, StyleClassModule, AppBreadcrumb, AppConfigurator],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTopbar {
    readonly layoutService = inject(LayoutService);
    searchQuery = '';

    toggleDarkMode(): void {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
