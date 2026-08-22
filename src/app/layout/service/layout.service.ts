import { Injectable, effect, signal, computed, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';

export type MenuMode = 'static' | 'overlay' | 'slim' | 'slim-plus';
export type InputStyle = 'outlined' | 'filled';

export interface LayoutConfig {
    preset: string;
    primary: string;
    surface: string | undefined | null;
    darkTheme: boolean;
    menuMode: MenuMode;
    scale: number;
    inputStyle: InputStyle;
    ripple: boolean;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    configSidebarVisible: boolean;
    mobileMenuActive: boolean;
    menuHoverActive: boolean;
    activePath: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    private readonly configStorageKey = 'sakai-layout-config';

    private readonly defaultConfig: LayoutConfig = {
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: false,
        menuMode: 'static',
        scale: 14,
        inputStyle: 'outlined',
        ripple: true
    };

    private readonly primeng = inject(PrimeNG);

    layoutConfig = signal<LayoutConfig>(this.loadConfig());

    layoutState = signal<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        mobileMenuActive: false,
        menuHoverActive: false,
        activePath: null
    });

    theme = computed(() => (this.layoutConfig().darkTheme ? 'light' : 'dark'));

    isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive);

    isDarkTheme = computed(() => this.layoutConfig().darkTheme);

    getPrimary = computed(() => this.layoutConfig().primary);

    getSurface = computed(() => this.layoutConfig().surface);

    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

    isSlim = computed(() => this.layoutConfig().menuMode === 'slim');

    isSlimPlus = computed(() => this.layoutConfig().menuMode === 'slim-plus');

    isCompact = computed(() => this.isSlim() || this.isSlimPlus());

    transitionComplete = signal<boolean>(false);

    private initialized = false;

    constructor() {
        effect(() => {
            const config = this.layoutConfig();

            this.applyLayoutPreferences(config);
            this.saveConfig(config);

            if (!this.initialized || !config) {
                this.initialized = true;
                this.toggleDarkMode(config);
                return;
            }

            this.handleDarkModeTransition(config);
        });
    }

    private handleDarkModeTransition(config: LayoutConfig): void {
        const supportsViewTransition = 'startViewTransition' in document;

        if (supportsViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
        }
    }

    private startViewTransition(config: LayoutConfig): void {
        document.startViewTransition(() => {
            this.toggleDarkMode(config);
        });
    }

    toggleDarkMode(config?: LayoutConfig): void {
        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    private applyLayoutPreferences(config: LayoutConfig): void {
        if (typeof document === 'undefined') {
            return;
        }

        document.documentElement.style.fontSize = `${config.scale}px`;
        this.primeng.inputVariant.set(config.inputStyle);
        this.primeng.ripple.set(config.ripple);
    }

    private loadConfig(): LayoutConfig {
        if (typeof window === 'undefined') {
            return this.defaultConfig;
        }

        try {
            const savedConfig = window.localStorage.getItem(this.configStorageKey);
            return savedConfig ? { ...this.defaultConfig, ...JSON.parse(savedConfig) } : this.defaultConfig;
        } catch {
            return this.defaultConfig;
        }
    }

    private saveConfig(config: LayoutConfig): void {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            window.localStorage.setItem(this.configStorageKey, JSON.stringify(config));
        } catch {
            // Storage can be unavailable in restricted browsing contexts.
        }
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.layoutState.update((prev) => ({ ...prev, overlayMenuActive: !this.layoutState().overlayMenuActive }));
        }

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({ ...prev, staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive }));
        } else {
            this.layoutState.update((prev) => ({ ...prev, mobileMenuActive: !this.layoutState().mobileMenuActive }));
        }
    }

    showConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
    }

    hideConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }
}
