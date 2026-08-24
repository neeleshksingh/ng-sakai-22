import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../app.menu.service';
import {
    ColorScheme,
    LayoutService,
    MenuMode
} from '../service/app.layout.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit {
    @Input() minimal: boolean = false;

    componentThemes: any[] = [];

    scales: number[] = [12, 13, 14, 15, 16];

    configKey = 'appConfig';

    get config() {
        return this.layoutService.config();
    }

    get currentTheme(): string {
        return this.config.theme;
    }
    set currentTheme(value: string) {
        this.updateConfig({ theme: value });
    }

    get colorScheme(): ColorScheme {
        return this.config.colorScheme;
    }
    set colorScheme(value: ColorScheme) {
        this.updateConfig({ colorScheme: value });
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(value: boolean) {
        this.layoutService.state.configSidebarVisible = value;
    }

    get scale(): number {
        return this.config.scale;
    }
    set scale(value: number) {
        this.updateConfig({ scale: value });
    }

    get menuTheme(): string {
        return this.config.layoutTheme;
    }
    set menuTheme(value: string) {
        this.updateConfig({ layoutTheme: value });
    }

    get menuMode(): MenuMode {
        return this.config.menuMode;
    }
    set menuMode(value: MenuMode) {
        this.updateConfig({ menuMode: value });
        if (this.layoutService.isSlimPlus() || this.layoutService.isSlim()) {
            this.menuService.reset();
        }
    }

    get inputStyle(): string {
        return this.config.inputStyle;
    }
    set inputStyle(value: string) {
        this.updateConfig({ inputStyle: value });
    }

    get ripple(): boolean {
        return this.config.ripple;
    }
    set ripple(value: boolean) {
        this.updateConfig({ ripple: value });
    }

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService
    ) { }

    ngOnInit() {
        this.loadConfig();
        this.componentThemes = [
            { name: 'indigo', lightColor: '#4C63B6', darkColor: '#6A7EC2' },
            { name: 'blue', lightColor: '#1992D4', darkColor: '#3BABE8' },
            { name: 'green', lightColor: '#27AB83', darkColor: '#44D4A9' },
            { name: 'deeppurple', lightColor: '#896FF4', darkColor: '#B1A0F8' },
            { name: 'orange', lightColor: '#DE911D', darkColor: '#E8AB4F' },
            { name: 'cyan', lightColor: '#00B9C6', darkColor: '#58CDD5' },
            { name: 'yellow', lightColor: '#F9C404', darkColor: '#FDDD68' },
            { name: 'pink', lightColor: '#C74B95', darkColor: '#D77FB4' },
            { name: 'purple', lightColor: '#BA6FF4', darkColor: '#D1A0F8' },
            { name: 'lime', lightColor: '#84BD20', darkColor: '#A3D44E' },
        ];
    }

    changeTheme(theme: string) {
        this.currentTheme = theme;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    decrementScale() {
        if (this.scale > this.scales[0]) {
            this.scale--;
        }
    }

    incrementScale() {
        if (this.scale < this.scales[this.scales.length - 1]) {
            this.scale++;
        }
    }

    private updateConfig(changes: Partial<any>) {
        const updatedConfig = { ...this.config, ...changes };
        this.layoutService.config.update(() => updatedConfig);
        localStorage.setItem(this.configKey, JSON.stringify(updatedConfig));
    }

    private loadConfig() {
        const savedConfig = localStorage.getItem(this.configKey);
        if (savedConfig) {
            this.layoutService.config.update(() => JSON.parse(savedConfig));
        }
    }
}