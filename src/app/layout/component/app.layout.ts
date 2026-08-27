import { Component, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '@/app/layout/service/layout.service';
import { ProgressBarComponent } from "@/app/global/components/progress-bar/progress-bar.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter, ProgressBarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div class="layout-wrapper layout-container" [ngClass]="containerClass()">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container layout-content-wrapper">
            <div class="global-progress-bar-inner">
                <app-progress-bar></app-progress-bar>
            </div>
            <div class="layout-main layout-content">
                <div class="layout-content-inner pb-7">
                    <router-outlet></router-outlet>
                    <app-footer></app-footer>
                </div>
            </div>
        </div>
        <div class="layout-mask"></div>
    </div> `
})
export class AppLayout {
    layoutService = inject(LayoutService);

    constructor() {
        effect(() => {
            const state = this.layoutService.layoutState();
            if (state.mobileMenuActive) {
                document.body.classList.add('blocked-scroll');
            } else {
                document.body.classList.remove('blocked-scroll');
            }
        });
    }

    containerClass = computed(() => {
        const config = this.layoutService.layoutConfig();
        const state = this.layoutService.layoutState();
        return {
            'layout-light': !config.darkTheme,
            'layout-dark': config.darkTheme,
            'layout-overlay': config.menuMode === 'overlay',
            'layout-static': config.menuMode === 'static',
            'layout-slim': config.menuMode === 'slim',
            'layout-slim-plus': config.menuMode === 'slim-plus',
            'layout-static-inactive': state.staticMenuDesktopInactive && config.menuMode === 'static',
            'layout-overlay-active': state.overlayMenuActive,
            'layout-mobile-active': state.mobileMenuActive,
            'p-input-filled': config.inputStyle === 'filled',
            'p-ripple-disabled': !config.ripple
        };
    });
}
