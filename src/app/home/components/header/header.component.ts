import { SharedModule } from '@/shared.module';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];
  mobileMenuVisible = false;
  activeMenuId: string = '';
  openDropdownId: string | null = null;
  mobileOpenId: string | null = null;
  isScrolled = false;

  @ViewChild('navLinks', { static: false }) navLinksRef!: ElementRef<HTMLElement>;

  image_Url: string = '';
  title: string = '';
  shortName: string = "";
  city: string = "";
  supportEmailId: string = '';

  constructor(private router: Router) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item')) {
      this.openDropdownId = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.openDropdownId = null;
    if (this.mobileMenuVisible) {
      this.closeMobileMenu();
    }
  }

  ngOnInit() {
    this.initializeMenu();
    this.updateActiveMenu();

    // Listen to route changes to update active menu
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveMenu();
    });

    const matchedPartner = environment.partner;
    this.image_Url = matchedPartner.logo_url;
    this.title = matchedPartner.title;
    this.city = matchedPartner.city;
    this.supportEmailId = matchedPartner.supportEmailId;
    this.shortName = matchedPartner.shortName;
  }

  initializeMenu() {
    this.menuItems = [
      {
        id: 'home',
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
        command: () => this.closeMobileMenu()
      },
      {
        id: 'login',
        label: 'Sign In',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
        command: () => this.closeMobileMenu()
      },
      {
        id: 'career',
        label: 'Career',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Job Openings', icon: 'pi pi-list', routerLink: '/career/job-list',
            command: () => this.closeMobileMenu()
          },
          // {
          //   label: 'Other Info', icon: 'pi pi-info-circle', routerLink: '/career/info',
          //   command: () => this.closeMobileMenu()
          // }
        ]
      },
      {
        id: 'admissions',
        label: 'Admissions',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Student Onboarding', icon: 'pi pi-user-plus', routerLink: '/admissions/student-onboarding/login',
            command: () => this.closeMobileMenu()
          },
          // {
          //   label: 'Under Graduate', icon: 'pi pi-id-card', routerLink: '/admissions/undergraduate',
          //   command: () => this.closeMobileMenu()
          // },
          // {
          //   label: 'Graduate', icon: 'pi pi-id-card', routerLink: '/admissions/graduate',
          //   command: () => this.closeMobileMenu()
          // },
          // {
          //   label: 'Post Graduate', icon: 'pi pi-id-card', routerLink: '/admissions/postgraduate',
          //   command: () => this.closeMobileMenu()
          // },
          // {
          //   label: 'Doctoral', icon: 'pi pi-id-card', routerLink: '/admissions/doctoral',
          //   command: () => this.closeMobileMenu()
          // }
        ]
      },
      // {
      //   id: 'student-resources',
      //   label: 'Student Resources',
      //   icon: 'pi pi-book',
      //   items: [
      //     { label: 'Libraries', routerLink: '/resources/libraries' },
      //     { label: 'Libraries', icon: 'pi pi-bookmark', routerLink: '/resources/libraries' },
      //     { 
      //       label: 'Campus Life',
      //       icon: 'pi pi-building',
      //       items: [
      //         { label: 'Housing', icon: 'pi pi-home', routerLink: '/resources/campus/housing' },
      //         { label: 'Activities', icon: 'pi pi-calendar', routerLink: '/resources/campus/activities' }
      //       ]
      //     },
      //     { label: 'Support Services', icon: 'pi pi-question-circle', routerLink: '/resources/support' }
      //   ]
      // },
      {
        id: 'about',
        label: 'About',
        icon: 'pi pi-info-circle',
        items: [
          // {
          //   label: 'History', icon: 'pi pi-clock', routerLink: '/about/history',
          //   command: () => this.closeMobileMenu()
          // },
          // {
          //   label: 'Contact', icon: 'pi pi-envelope', routerLink: '/about/contact',
          //   command: () => this.closeMobileMenu()
          // }
        ]
      }
    ];
  }

  updateActiveMenu() {
    const currentPath = this.router.url;
    // Strip hash if present (for hash-based routing)
    const cleanPath = currentPath.includes('#') ? currentPath.split('#')[1] : currentPath;

    this.activeMenuId = '';

    this.menuItems.forEach(item => {
      if (item.routerLink && cleanPath.startsWith(item.routerLink)) {
        this.activeMenuId = item.id || '';
      } else if (item.items) {
        // Check submenu items by their exact routerLink
        const matched = this.checkSubmenuItems(item.items, cleanPath);
        if (matched) {
          this.activeMenuId = item.id || '';
        }
        // Also match by parent id as route prefix (e.g. /admissions, /career)
        if (!matched && item.id && cleanPath.startsWith('/' + item.id)) {
          this.activeMenuId = item.id;
        }
      }
    });
  }

  private checkSubmenuItems(items: MenuItem[], currentPath: string): boolean {
    for (const subItem of items) {
      if (subItem.routerLink && currentPath.startsWith(subItem.routerLink)) {
        return true;
      }
      if (subItem.items && this.checkSubmenuItems(subItem.items, currentPath)) {
        return true;
      }
    }
    return false;
  }

  toggleDropdown(id: string | undefined) {
    if (!id) return;
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  closeDropdown() {
    this.openDropdownId = null;
  }

  toggleMobileDropdown(id: string | undefined) {
    if (!id) return;
    this.mobileOpenId = this.mobileOpenId === id ? null : id;
  }

  closeMobileMenu() {
    this.mobileMenuVisible = false;
    this.mobileOpenId = null;
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
    if (!this.mobileMenuVisible) {
      this.mobileOpenId = null;
    }
  }

  onNavMouseMove(event: MouseEvent) {
    const container = this.navLinksRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set shine position on the container for the global glow
    container.style.setProperty('--shine-x', `${x}px`);
    container.style.setProperty('--shine-y', `${y}px`);
    container.style.setProperty('--shine-opacity', '1');

    // Set per-item shine for each nav-item
    const items = container.querySelectorAll('.nav-item');
    items.forEach((item: Element) => {
      const el = item as HTMLElement;
      const itemRect = el.getBoundingClientRect();
      const itemX = event.clientX - itemRect.left;
      const itemY = event.clientY - itemRect.top;
      el.style.setProperty('--item-shine-x', `${itemX}px`);
      el.style.setProperty('--item-shine-y', `${itemY}px`);
    });
  }

  onNavMouseLeave() {
    const container = this.navLinksRef?.nativeElement;
    if (!container) return;
    container.style.setProperty('--shine-opacity', '0');
  }
}
