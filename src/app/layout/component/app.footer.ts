import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '@/app/idp/services/authentication-service.service';
import { LoginResponse } from '@/app/shared/models/idp/login';
import { IpService } from '@/app/shared/services/ip.service';
import { LayoutService } from '@/app/layout/service/layout.service';
import { RoleTagComponent } from '@/app/global/components/role-tag/role-tag.component';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, DrawerModule, RoleTagComponent],
    templateUrl: './app.footer.html',
    styleUrl: './app.footer.scss',
    providers: [MessageService]
})
export class AppFooter implements OnInit {
    publicIp: string = '49.205.33.227';
    userGreetingMessage: string = 'Welcome!';
    displayName = '';
    username = '';
    totalRoles = 0;
    allRolesSorted: string[] = [];
    userPanelVisible = false;

    private currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(
        JSON.parse(localStorage.getItem('currentUser') || 'null')
    );

    constructor(
        public layoutService: LayoutService,
        private ipService: IpService,
        private messageService: MessageService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.getIPAddress();
        const user = this.currentUserSubject.value?.applicationUser;
        if (user) {
            this.username = user.userName || '';
            this.displayName = user.displayName || 'User';
            this.allRolesSorted = (user.roles || []).sort((a, b) => a.localeCompare(b));
            this.totalRoles = this.allRolesSorted.length;
        }
    }

    getGreeting(): string {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good morning';
        } else if (currentHour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    get colorScheme(): string {
        return this.layoutService.layoutConfig().darkTheme ? 'dark' : 'light';
    }

    getIPAddress() {
        this.ipService.getPublicIp().subscribe({
            next: (response) => {
                if (response?.ip) {
                    this.publicIp = response.ip;
                }
            },
            error: (error) => {
                console.error('Error fetching IP address', error);
            }
        });
    }
}
