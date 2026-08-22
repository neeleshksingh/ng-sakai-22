# Sakai19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.







# 🧬 CODEX PROMPT: Migrate NCorePro.UI.Client to Angular 22

REFERENCE PROJECT (Angular 17):
/Users/neeleshkumarsingh/Documents/PyxisBlu/NCorePro.UI.Client

TARGET PROJECT (Angular 22 + PrimeNG 22):
/Users/neeleshkumarsingh/Documents/Personal/ng-sakai-22

> **Mission**: Recreate every module, layout, component shell, dashboard, KPI card, sidebar, topbar, footer, menu, skeleton, generic component, pipe, guard, interceptor, and folder structure from the existing **Angular 18 + PrimeNG 17** project into a **brand-new Angular 22 project** — keeping the **exact same visual layout and structural architecture** but with:
> - ✅ **Dummy/empty logic** (no real API calls, no real business logic)
> - ✅ **Hardcoded placeholder data** for KPIs, tables, charts, timelines
> - ✅ **New project's own theming system** (dark mode, color selection, theme config) — do NOT port the old theme CSS files
> - ✅ **Same fonts, card styles, spacing, scrollbar customization, animations** from the old project
> - ✅ **Same folder structure, module organization, routing hierarchy**
> - ✅ Use **Angular 22 standalone components** (no NgModules) and **PrimeNG 19+** equivalents

---

## 📌 PART 1: TECHNOLOGY STACK (New Project)

```
Framework:        Angular 22 (standalone components, signals, new control flow @if/@for)
UI Library:       PrimeNG 19+ (latest compatible with Angular 22)
CSS Framework:    PrimeFlex 4+
Icons:            PrimeIcons 7+ AND FontAwesome 6 Free
Charts:           Chart.js 4+
State Mgmt:       NgRx Signals Store (replaces @ngrx/store + effects)
Styling:          SCSS
Calendar:         FullCalendar 6+
Rich Text:        Quill 2+ (for p-editor)
Build:            Angular CLI with esbuild
Routing:          HashLocationStrategy
```

---

## 📌 PART 2: EXACT FOLDER STRUCTURE TO REPLICATE

Create this **exact** folder tree. Each leaf component should have `.component.ts`, `.component.html`, `.component.scss` files (standalone components, no spec files unless noted).

```
src/
├── index.html                          # Splash screen with loading cubes animation
├── main.ts                             # Bootstrap standalone
├── styles.scss                         # Global styles (scrollbar, progress bar, tooltip customizations)
├── favicon.ico
├── environments/
│   ├── environment.ts
│   ├── environment.production.ts
│   ├── environment.p10001.ts
│   └── environment.p10002.ts
├── assets/
│   ├── layout/
│   │   ├── fonts/                      # Layout fonts
│   │   ├── images/                     # Layout images (logo placeholders)
│   │   └── styles/
│   │       ├── layout/
│   │       │   ├── layout.scss         # Core layout styles
│   │       │   └── preloading.css      # Splash screen CSS
│   │       └── theme/                  # Theme files (NEW project's own theme system)
│   ├── demo/
│   │   ├── images/dashboard/           # SVG wave graphics (users, locations, rate, interactions) - light & dark variants
│   │   └── styles/
│   │       ├── flags/flags.css
│   │       ├── badges.scss
│   │       └── code.scss
│   ├── images/                         # App images
│   ├── animations/                     # Lottie/GIF animation files
│   └── partner-images/                 # Partner logo placeholders
└── app/
    ├── app.component.ts                # Root: <app-lazy-loader>, <p-toast>, <p-confirmDialog>, <router-outlet>
    ├── app.component.html
    ├── app.component.scss
    ├── app.routes.ts                   # Standalone routing config (replaces app-routing.module.ts)
    ├── app.config.ts                   # Application config (providers, etc.)
    │
    ├── layout/                         # ═══ SHELL LAYOUT (Topbar + Sidebar + Content + Footer) ═══
    │   ├── app.layout.component.ts/html        # Main shell: topbar, sidebar, content-wrapper, footer, config panel
    │   ├── app.topbar.component.ts/html/scss   # Logo, breadcrumb, search, profile dropdown (avatar, name, role, logout)
    │   ├── app.sidebar.component.ts/html       # Sidebar wrapper containing <app-menu>
    │   ├── app.menu.component.ts/html          # Sidebar menu with drag-drop reorder, active-link highlighting
    │   ├── app.menuitem.component.ts           # Recursive menu item with expand/collapse animation
    │   ├── app.menu.service.ts                 # Menu state management
    │   ├── app.breadcrumb.component.ts/html    # Breadcrumb: PartnerName / ModuleName / PageName
    │   ├── app.footer.component.ts/html/scss   # Footer: greeting, username, roles sidebar, copyright, IP address
    │   ├── api/
    │   │   └── tabcloseevent.ts                # Tab close event interface
    │   ├── service/
    │   │   ├── app.layout.service.ts           # Layout config signal, menu modes (static/overlay/slim/slim-plus), color schemes, theme switching, scale
    │   │   └── animation.service.ts            # Animation service for national days
    │   ├── config/
    │   │   ├── app.config.component.ts/html    # Settings sidebar: menu type, color scheme, layout theme, theme colors, scale, input style, ripple
    │   │   └── config.module.ts                # Config module
    │   └── animation/
    │       ├── birthday-animation/             # Birthday celebration animation component
    │       ├── national-days-animation/        # National days animation component
    │       ├── new-year/                       # New year animation component
    │       └── foundation-day/                 # Foundation day animation component
    │
    ├── shared/                         # ═══ SHARED UTILITIES ═══
    │   ├── components/
    │   │   ├── leave-date-range-picker/        # Date range picker component
    │   │   └── pending-feedback-dialog/        # Feedback dialog component
    │   ├── config/                             # Shared configuration
    │   ├── directives/
    │   │   ├── add-rowovsm.directive.ts        # Custom table row directive
    │   │   └── add-rowovsmsm.directive.ts      # Custom table row directive variant
    │   ├── documentation/                      # Documentation components
    │   ├── guard/
    │   │   ├── auth-guard.guard.ts             # Auth guard (dummy: always returns true)
    │   │   ├── permission.guard.ts             # Permission guard (dummy: always returns true)
    │   │   └── survey-pending.guard.ts         # Survey pending guard (dummy)
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts             # Auth interceptor (dummy: pass-through)
    │   │   ├── error.interceptor.ts            # Error interceptor (dummy: pass-through)
    │   │   └── progress-bar.interceptor.ts     # Progress bar interceptor (dummy)
    │   ├── models/                             # ═══ INTERFACE/MODEL STUBS (empty interfaces) ═══
    │   │   ├── TimeClockPlus/
    │   │   ├── bigleads/
    │   │   ├── cloudbytes/
    │   │   ├── commons/
    │   │   │   └── user-roles.ts               # Roles enum (KEEP THIS — used for menu role filtering)
    │   │   ├── developers/
    │   │   ├── digital-fingers/
    │   │   ├── executiveedge/
    │   │   ├── finance-Pro/
    │   │   ├── global/
    │   │   ├── idp/
    │   │   │   ├── login.ts                    # LoginResponse interface stub
    │   │   │   └── challengeUser.ts            # Challenge user interface stub
    │   │   ├── knowledge-stand/
    │   │   ├── message-from-desk/
    │   │   ├── mindspark/
    │   │   ├── smallbizgurus/
    │   │   ├── student-onboarding/
    │   │   ├── students/
    │   │   └── virtuallearn/
    │   ├── pipes/
    │   │   ├── global-currency.pipe.ts         # Currency formatting pipe (dummy)
    │   │   ├── has-permission.pipe.ts          # Permission check pipe (dummy: always true)
    │   │   ├── number-to-words.pipe.ts         # Number to words pipe (dummy)
    │   │   ├── reduce-duplicates-select-item.pipe.ts  # Dedup pipe (dummy)
    │   │   └── safe.pipe.ts                    # Safe HTML/URL pipe (dummy)
    │   └── services/
    │       ├── date-formatter.service.ts       # Date formatting (dummy)
    │       ├── event-logo.service.ts           # Event logo service (dummy)
    │       ├── feedback-survey-pending.service.ts
    │       ├── generic-service-global.service.ts
    │       ├── generic-service-nols.service.ts
    │       ├── generic.service.ts
    │       ├── ip.service.ts                   # IP address service (returns dummy "192.168.1.1")
    │       ├── loading.service.ts              # Loading state (BehaviorSubject<boolean>)
    │       ├── local-storage.service.ts
    │       ├── module-tracker.service.ts
    │       ├── ovs-search-state.service.ts
    │       ├── signal-r.service.ts             # SignalR service (dummy)
    │       ├── storage.service.ts
    │       └── utility.service.ts
    │
    ├── global/                         # ═══ GLOBAL REUSABLE COMPONENTS ═══
    │   ├── components/
    │   │   ├── academic-session-view/
    │   │   ├── accounting-module/
    │   │   ├── alert-dialog/                   # Alert dialog component
    │   │   ├── api-loading-screen/             # Full-screen loading overlay
    │   │   ├── base-menu-config/               # Base menu configuration component
    │   │   ├── document-center-global/
    │   │   ├── employee-salary-break-down/
    │   │   ├── examination-backlog-history/
    │   │   ├── exception-pages/
    │   │   │   ├── not-found/                  # 404 page
    │   │   │   ├── access-denied/              # 403 page
    │   │   │   ├── forbidden-access/           # Forbidden page
    │   │   │   ├── internal-server-error/      # 500 page
    │   │   │   ├── login-token-expired/        # Token expired page
    │   │   │   └── under-progress/             # Under construction page
    │   │   ├── generic-components/
    │   │   │   ├── generic-manage/             # Generic CRUD manage component (form dialog)
    │   │   │   ├── generic-table/              # Generic data table component (p-table wrapper)
    │   │   │   └── generic-view/               # Generic view/detail component
    │   │   ├── lazy-loader/                    # Lazy loading animation component
    │   │   ├── program-view/
    │   │   ├── progress-bar/                   # Global progress bar component
    │   │   ├── role-tag/                       # Role badge/tag component with color mapping
    │   │   ├── search-components/
    │   │   ├── sic/
    │   │   ├── sic-old-version/
    │   │   ├── skeletons/
    │   │   │   ├── bar-graph-skeleton/         # Skeleton loader for bar charts
    │   │   │   ├── dashboard-cards-skeleton/   # Skeleton loader for KPI cards
    │   │   │   └── dashboard-list-skeleton/    # Skeleton loader for lists
    │   │   ├── student-admission-withdrawal/
    │   │   ├── student-dashboard-notice/
    │   │   ├── student-master-sheet/
    │   │   ├── student-topper-list/
    │   │   └── welcome-letter/
    │   ├── services/
    │   │   └── common/
    │   │       └── shared.service.ts           # SharedService with isLoading$ observable
    │   └── global.module.ts                    # (legacy reference only — use standalone)
    │
    ├── store/                          # ═══ NGRX SIGNALS STORE (stub) ═══
    │   ├── actions/
    │   ├── effects/
    │   ├── models/
    │   ├── reducers/
    │   ├── selectors/
    │   └── provider.ts
    │
    ├── home/                           # ═══ PUBLIC HOME/LANDING ═══
    │   ├── components/
    │   │   ├── header/                 # Public header (standalone)
    │   │   └── home/                   # Home/landing page (standalone)
    │   └── services/
    │
    ├── idp/                            # ═══ IDENTITY PROVIDER (Login/Auth) ═══
    │   ├── components/
    │   │   └── login/                  # Login page component (standalone)
    │   ├── services/
    │   │   └── authentication-service.service.ts   # Auth service (dummy login/logout)
    │   ├── store/
    │   ├── idp.routing.module.ts
    │   └── idp.module.ts
    │
    ├── dashboard/                      # ═══ MAIN DASHBOARD ═══
    │   └── components/
    │       └── dashboard/
    │           ├── dashboard.component.html    # SEE LAYOUT SPEC BELOW
    │           ├── dashboard.component.ts
    │           └── dashboard.component.scss
    │
    │   ══════════════════════════════════════════════════════════════
    │   FEATURE MODULES (each follows the SAME internal structure)
    │   ══════════════════════════════════════════════════════════════
    │
    ├── cloud-bytes/                    # Module: CloudBytes (Masters/Config)
    │   ├── cloud-bytes/                # Module definition & routing
    │   ├── components/
    │   │   ├── company/
    │   │   │   ├── organizational-holidays/
    │   │   │   ├── partner/
    │   │   │   ├── partner-contact-category/
    │   │   │   ├── partner-contact-number/
    │   │   │   ├── partner-image/
    │   │   │   └── partner-image-type/
    │   │   ├── dashboard/dashboard/    # CloudBytes dashboard (KPI cards + charts)
    │   │   ├── layouts/cloud-bytes/    # Module layout wrapper
    │   │   ├── masters/
    │   │   │   ├── academic-holidays/
    │   │   │   ├── academics/
    │   │   │   ├── accounts/
    │   │   │   ├── hr/
    │   │   │   ├── infrastructure/
    │   │   │   ├── profilesidebar/
    │   │   │   ├── services/
    │   │   │   ├── students/
    │   │   │   └── subjects/
    │   │   ├── reports/
    │   │   └── transactions/
    │   │       ├── academics/
    │   │       └── accounts/
    │   ├── services/
    │   └── store/
    │       ├── actions/
    │       ├── effects/
    │       ├── reducers/
    │       ├── selectors/
    │       └── states/
    │
    ├── big-leads/                      # Module: BigLeads (Admissions/Student Intake)
    │   ├── big-leads/                  # Module definition & routing
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/big-leads/
    │   │   ├── reports/
    │   │   │   ├── student-information/
    │   │   │   ├── student-master-sheet/
    │   │   │   ├── student-master-sheet-export/
    │   │   │   └── student-register-report/
    │   │   ├── service-request/
    │   │   │   └── student-profile-update-pending-request/
    │   │   └── transactions/
    │   │       ├── student-admission-withdrawal/
    │   │       └── students/
    │   └── services/
    │
    ├── mind-spark/                     # Module: MindSpark (Academics)
    │   ├── mind-spark/                 # Module definition & routing
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/mind-spark/
    │   │   ├── help-guide/
    │   │   ├── masters/
    │   │   ├── reports/
    │   │   └── transactions/
    │   └── services/
    │
    ├── knowledge-stand/                # Module: KnowledgeStand (Examinations)
    │   ├── knowledge-stand/
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/knowledge-stand/
    │   │   ├── masters/
    │   │   ├── reports/
    │   │   └── transactions/
    │   └── services/
    │
    ├── finance-Pro/                    # Module: FinancePro (Accounts/Finance)
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/finance-pro/
    │   │   ├── masters/
    │   │   ├── reports/
    │   │   └── transactions/
    │   └── services/
    │
    ├── smallbiz-gurus/                 # Module: SmallBizGurus (HR/Payroll)
    │   ├── smallbiz-gurus/
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/smallbizz-gurus/
    │   │   ├── employees/
    │   │   │   ├── Profile Details/
    │   │   │   ├── employee-department-group/
    │   │   │   ├── employee-details/
    │   │   │   ├── employee-exit/
    │   │   │   ├── employee-grade/
    │   │   │   ├── employee-resignation/
    │   │   │   └── speciality/
    │   │   ├── masters/
    │   │   ├── payroll/
    │   │   │   ├── deduction-component/
    │   │   │   ├── earning-component/
    │   │   │   ├── employee-grade-salary-structure/
    │   │   │   ├── income-tax-slab/
    │   │   │   ├── payroll-period/
    │   │   │   ├── salary-structure/
    │   │   │   ├── salary-structure-assignment/
    │   │   │   ├── salary-structure-salary-component-mapping/
    │   │   │   └── tax-regime/
    │   │   ├── recruitment/
    │   │   │   ├── employee-background-verification/
    │   │   │   ├── interviews/
    │   │   │   ├── job-offers/
    │   │   │   └── jobs/
    │   │   └── students/
    │   │       ├── student-status/
    │   │       ├── student-status-list/
    │   │       └── student-status-view/
    │   └── services/
    │
    ├── executive-edge/                 # Module: ExecutiveEdge (Feedback/Surveys)
    │   ├── executive-edge/
    │   ├── components/
    │   │   ├── dashboard/
    │   │   │   ├── dashboard/
    │   │   │   ├── active-feedback-announcement/
    │   │   │   └── feed-back-chart/
    │   │   ├── layouts/executive-edge/
    │   │   ├── masters/
    │   │   │   ├── feedback-questions/
    │   │   │   └── university-documents/
    │   │   ├── reports/
    │   │   │   ├── BatchFacultyFeedback/
    │   │   │   └── organisation-feedback-internal/
    │   │   └── transactions/
    │   └── services/
    │
    ├── digital-fingers/                # Module: DigitalFingers (IT/User Management)
    │   ├── digital-fingers/
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/digital-fingers/
    │   │   ├── masters/
    │   │   │   ├── background-service-options/
    │   │   │   ├── permission-create-manage/
    │   │   │   ├── permission-matrix/
    │   │   │   ├── permissions/
    │   │   │   ├── roles/
    │   │   │   └── user-permission/
    │   │   ├── reports/
    │   │   └── transactions/
    │   │       ├── import-user/
    │   │       ├── lock-users/
    │   │       ├── reset-password/
    │   │       ├── service-request-pending-view/
    │   │       ├── service-request-review/
    │   │       ├── update-user/
    │   │       ├── user-details/
    │   │       ├── user-list/
    │   │       ├── user-roles/
    │   │       └── user-signup/
    │   └── services/
    │
    ├── time-clock-plus/                # Module: TimeClockPlus (Leave/Attendance)
    │   ├── time-clock-plus/
    │   ├── components/
    │   │   ├── common-components/
    │   │   │   ├── leave-request-work-assignment/
    │   │   │   └── leave-request-workflow/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layout/time-clock-plus/
    │   │   ├── masters/
    │   │   │   ├── employee-filters/
    │   │   │   ├── employee-leave-policy-mapping/
    │   │   │   ├── employee-leave-request-advance-setting/
    │   │   │   ├── leave-periodicity/
    │   │   │   ├── leave-policy/
    │   │   │   ├── leave-request-approval-level/
    │   │   │   ├── leave-scheme/
    │   │   │   ├── leave-scheme-leave-type-rule/
    │   │   │   ├── leave-type/
    │   │   │   └── leave-year/
    │   │   ├── reports/
    │   │   │   ├── employee-leave-balance/
    │   │   │   ├── employee-leave-grant/
    │   │   │   └── employee-leave-reports/
    │   │   ├── transactions/
    │   │   │   ├── employee-leave-balance/
    │   │   │   ├── employee-leave-grant-job-status/
    │   │   │   ├── employee-leave-request/
    │   │   │   ├── leave-process-status/
    │   │   │   ├── timesheet-express/
    │   │   │   └── work-assignment/
    │   │   └── workflow/
    │   │       ├── employee-leave-request-status-update/
    │   │       ├── leave-request-work-assignment-details/
    │   │       └── timesheet/
    │   └── services/
    │
    ├── virtual-learn/                  # Module: VirtualLearn (Library)
    │   ├── virtual-learn/
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/virtual-learn/
    │   │   ├── masters/
    │   │   │   ├── books/
    │   │   │   ├── library/
    │   │   │   ├── library-room/
    │   │   │   ├── library-section/
    │   │   │   ├── library-wardrobe/
    │   │   │   └── vendor-master/
    │   │   ├── reports/
    │   │   │   ├── accession-register-department-wise-report/
    │   │   │   ├── book-lost-report/
    │   │   │   └── issue-return-book-report/
    │   │   └── transactions/
    │   │       ├── book-location/
    │   │       ├── book-purchase/
    │   │       ├── book-purchase-order/
    │   │       ├── book-purchase-requisition/
    │   │       ├── book-transaction/
    │   │       ├── library-member-log-status/
    │   │       └── library-membership/
    │   └── services/
    │
    ├── developers/                     # Module: Developers (Dev Tools)
    │   ├── components/
    │   │   ├── dashboard/dashboard/
    │   │   ├── layouts/developers/
    │   │   ├── masters/
    │   │   │   └── partner-app-setting/
    │   │   ├── reports/
    │   │   └── transactions/
    │   └── services/
    │
    ├── career/                         # Module: Career (Public Job Portal)
    │   └── components/
    │       ├── job-application/
    │       │   ├── job-application-basic/
    │       │   ├── job-application-educational/
    │       │   ├── job-application-experience/
    │       │   ├── job-application-resume/
    │       │   └── job-application-review/
    │       ├── job-description/
    │       └── job-listing/
    │
    ├── student-onboarding/             # Module: Student Onboarding (Public)
    │   ├── component/
    │   │   ├── fee-receipt/
    │   │   ├── payment-success/
    │   │   ├── student-onboarding-login/
    │   │   ├── student-program-provisional-landing/
    │   │   └── withdraw/
    │   ├── models/
    │   └── services/
    │       ├── bigleads/
    │       └── withdraw/
    │
    ├── students/                       # Module: Students (Student Portal)
    │   ├── components/
    │   │   ├── academic-result/
    │   │   ├── admit-card/
    │   │   ├── admit-card-v2/
    │   │   ├── backlog-examination-application/
    │   │   ├── backlog-examination-registration/
    │   │   ├── batch-attendance-summary/
    │   │   ├── bonafied-ekaliyan-scholarship/
    │   │   ├── bonafied-fees/
    │   │   ├── bonafied-job/
    │   │   ├── cgpa-conversion-certificate/
    │   │   ├── challan/
    │   │   ├── change-password/
    │   │   ├── dashboard-academics-calendar/
    │   │   ├── document-center/
    │   │   ├── e-learning/
    │   │   ├── examination-registration/
    │   │   ├── examination-scrutiny-application/
    │   │   ├── no-dues-certificate/
    │   │   ├── payment/
    │   │   ├── payment-help/
    │   │   ├── payment-response/
    │   │   ├── receipt-v2/
    │   │   ├── reciept/
    │   │   ├── request-tracker/
    │   │   ├── search-book/
    │   │   ├── semester-registration/
    │   │   ├── service-request/
    │   │   ├── service-request-list/
    │   │   ├── service-request-view/
    │   │   ├── student-feedback/
    │   │   ├── student-info-update-request/
    │   │   ├── student-profile/
    │   │   ├── student-profile-update/
    │   │   ├── student-program-change-request/
    │   │   ├── student-satisfaction-survey/
    │   │   ├── time-table/
    │   │   ├── university-feed/
    │   │   └── verify-apaar/
    │   ├── curriculum-framework/
    │   ├── dashboard/
    │   ├── services/
    │   └── students/
    │
    └── settings/                       # Module: Settings
        ├── components/
        │   ├── applications/
        │   └── security/
        └── settings/
```

---

## 📌 PART 3: MAIN LAYOUT SHELL — EXACT REPLICATION

### 3A. App Layout (`layout-container`)
```
┌──────────────────────────────────────────────────────┐
│ TOPBAR (fixed, full width)                           │
│  [Logo] [PartnerName / Breadcrumb] [Search] [Profile]│
├─────────┬────────────────────────────────────────────┤
│ SIDEBAR │  CONTENT WRAPPER                           │
│ (slim+) │  ┌─ Progress Bar ─────────────────────┐    │
│         │  │                                     │    │
│ • Dashboard │  <router-outlet>                   │    │
│ • BigLeads  │                                    │    │
│ • MindSpark │                                    │    │
│ • Know.Stand│                                    │    │
│ • FinPro    │                                    │    │
│ • SmallBiz  │                                    │    │
│ • CloudBytes│  ┌─ FOOTER ───────────────────────┐│    │
│ • Exec.Edge │  │ [Greeting+User] [©] [IP Addr] ││    │
│ • More ▸    │  └────────────────────────────────┘│    │
│   - DigiFing│                                    │    │
│   - TimeCl+ │                                    │    │
│   - VirtLrn │                                    │    │
├─────────┴────────────────────────────────────────────┤
│ CONFIG SIDEBAR (gear icon, right panel)              │
│  Menu Type | Color Scheme | Layout Theme | Themes    │
│  Scale | Input Style | Ripple Effect                 │
└──────────────────────────────────────────────────────┘
```

### 3B. Layout CSS Classes
- `layout-container`, `layout-light`, `layout-dark`, `layout-static`, `layout-slim`, `layout-slim-plus`, `layout-overlay`
- `layout-content-wrapper`, `layout-content`, `layout-content-inner`
- `layout-sidebar`, `layout-menu-container`, `layout-menu`
- `layout-topbar`, `topbar-menu`, `topbar-search`, `topbar-profile`
- Menu modes: `static` | `overlay` | `slim` | `slim-plus`

### 3C. Menu Configuration (Sidebar)
Staff Menu (drag-reorderable):
```
Dashboard         → fas fa-home        → dashboard
Big Leads          → fas fa-briefcase   → bigleads/dashboard
Mind Spark         → fas fa-brain       → mindspark/dashboard
Knowledge Stand    → fas fa-book-open   → knowledgestand/dashboard
Fin Pro            → fas fa-indian-rupee-sign → finpro/dashboard
SmallBiz Gurus     → fas fa-handshake   → smallbizgurus/dashboard
Cloud Bytes        → fas fa-cloud       → cloudbytes/dashboard
Executive Edge     → fas fa-user-tie    → executiveedge/dashboard
More ▸
  Digital Finger   → fas fa-user-gear   → digitalfingers/dashboard
  TimeClock Plus   → fas fa-calendar-days → timeclockplus/dashboard
  Virtual Learn    → fas fa-atlas       → virtuallearn/dashboard
```

Student Menu (NOT drag-reorderable):
```
Dashboard | Accounts (Payment, Challan, Receipt) | Academics (Sem Reg, Attendance, Curriculum, Timetable) | Examinations (Backlog, Result, Hall Ticket, Scrutiny) | Services (Books, ABC, Helpshift, Certificates, Docs, Feedback, Program Change) | Settings (Profile, Change Password)
```

---

## 📌 PART 4: MAIN DASHBOARD LAYOUT — EXACT KPI + WIDGET SPEC

### Row 1: 4 KPI Cards (col-12 lg:col-6 xl:col-3)
Each card follows this pattern:
```html
<div class="card h-full p-0 overflow-hidden flex flex-column">
  <div class="flex align-items-center p-3">
    <i class="pi pi-{icon} text-6xl text-{color}-500"></i>
    <div class="ml-3">
      <span class="text-{color}-500 block white-space-nowrap font-bold">LABEL</span>
      <span class="text-{color}-500 block text-2xl font-bold">VALUE</span>
    </div>
  </div>
  <img [src]="wave-svg-{light|dark}" class="w-full mt-auto" alt="...">
</div>
```

| Card | Icon | Color | Label | Dummy Value |
|------|------|-------|-------|-------------|
| 1 | Avatar with initials (p-avatar, xlarge, circle) | blue-500 | Employee Code + Name | `EMP001 - Mr. John Doe` |
| 2 | `pi-id-card` | orange-500 | System Roles | Tags: `Admin`, `Faculty` |
| 3 | `pi-calendar-plus` | green-500 | Upcoming Holiday | `Republic Day` / `In 5 Days (26 Jan)` |
| 4 | `pi-link` | purple-500 | Quick Links | List of 3 clickable links |

### Row 2: 3 Widget Columns (col-12 lg:col-6 xl:col-4)

**Widget 1**: Latest Notifications (p-scrollPanel)
- Title bar with "Latest Notifications" + pending work badge (p-tag, warning)
- Scrollable list of notification items with p-avatar icons
- Work Assignment items (orange avatars)
- Regular notice items (blue avatars)
- "View Work Assignments" button + "Read more..." link

**Widget 2**: Holiday Tabs (p-tabView)
- Tab 1: "Student Holiday" — p-table with columns: Holiday Name, Date, Type (p-tag: success/warning), Description
- Tab 2: "Organisational Holiday" — Same table structure
- Total count badge in header

**Widget 3**: Employee Calendar (FullCalendar)
- `<app-employee-calender mode="all">` placeholder component

### Row 3: More Widgets

**Widget 4**: Pending Marks Entry Table (conditional, col-12)
- p-table with paginator, sortable columns, global filter
- Columns: S.No., AcademicSessionName, ProgramName, Semester, Subject, SubjectCode, Action button

**Widget 5**: To Do List (col-12 lg:col-6 xl:col-4)
- Gradient header with "My To Do List" title + Add/Save buttons
- p-table with inline editing (p-cellEditor)
- Columns: Task Description (editable), Status (editable dropdown: NEW/In Progress/COMPLETED), Created Date, Action (delete)
- Status badges: blue (NEW), orange (In Progress), green (COMPLETED)
- Footer: tip text + total count

---

## 📌 PART 5: CLOUDBYTES DASHBOARD LAYOUT — KPIs

### Row 1: 4 KPI Cards (same card pattern as main dashboard)
| Card | Icon | Color | Label | Dummy Value |
|------|------|-------|-------|-------------|
| 1 | `pi-users` | blue-500 | Partner Code | `NCORE-2024` |
| 2 | `pi-map` | orange-500 | Total Departments | `12 Departments` |
| 3 | `pi-book` | green-500 | Total Programs Offering | `45 Programs` |
| 4 | `pi-comments` | purple-500 | Total Subjects | `350 Subjects` |

### Row 2: 3 Columns (col-12 lg:col-6 xl:col-4)
- **Chart 1**: "Program Distribution by Academic Sessions" — p-chart type="bar" (400px height) with dummy data
- **Widget**: "Upcoming Holidays" — scrollable table (Date, Holiday Name) with colored rows
- **Chart 2**: "Degree Type Distribution Chart" — p-chart type="bar" + "Toggle Legend" button

### Row 3: 3 Columns
- **Buildings/Floors**: Card with building name → list of floors (p-avatar labels "Floor N", room count)
- **Storage Knob**: p-knob (0-100), used keys count, remaining capacity text + Quick action links (Partner Edit, Partner Image, OVS Config, Refresh Cache) with gold p-avatar icons
- **Timeline**: "Recent Configurations" — p-timeline with color-coded markers, dates, titles, descriptions

---

## 📌 PART 6: EACH FEATURE MODULE DASHBOARD PATTERN

Every module (BigLeads, MindSpark, KnowledgeStand, FinPro, SmallBizGurus, ExecutiveEdge, DigitalFingers, TimeClockPlus, VirtualLearn, Developers) has a `dashboard/dashboard/` component. Create each with:

1. **4 KPI cards** at the top (same card HTML pattern) with module-relevant placeholder labels
2. **2-3 chart widgets** (p-chart bar/pie/doughnut with dummy datasets)
3. **1 recent activity / timeline widget**
4. **1 table widget** (p-table with 5-10 dummy rows)
5. Skeleton loaders (`<app-dashboard-cards-skeleton>`, `<app-bar-graph-skeleton>`) as loading states

Use `@if / @else` for loading/loaded states. Use `scalein animation-duration-{300|400|500|1000}` classes on KPI cards.

---

## 📌 PART 7: SUB-MODULE ROUTING PATTERN (Per Feature Module)

Each feature module follows this lazy-loaded routing hierarchy:

```
{module}/
  ├── (root) → dashboard/dashboard.module → loadChildren
  ├── company/ → company.module            (CloudBytes only)
  ├── masters/ → masters.module            → loadChildren
  ├── transactions/ → transactions.module  → loadChildren
  ├── reports/ → reports.module            → loadChildren
  ├── employees/ → employees.module        (SmallBiz only)
  ├── payroll/ → payroll.module            (SmallBiz only)
  ├── recruitment/ → recruitment.module    (SmallBiz only)
  ├── workflow/ → workflow.module          (TimeClock only)
  └── error pages (forbidden, access-denied, token-expired, server-error)
```

Each sub-module routing file should also include loading service start/stop on NavigationStart/End events.

---

## 📌 PART 8: GLOBAL STYLES TO PRESERVE

### Scrollbar Customization
```scss
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface-400, #c1c1c1); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--surface-500, #a8a8a8); }
```

### Progress Bar
```scss
.global-progress-bar-inner { height: 0; overflow: visible; position: relative; z-index: 998; width: 100%; }
```

### Dashboard Card Styles
```scss
.dashboard-cards .card { transition: transform 0.2s, box-shadow 0.2s; }
.dashboard-cards .card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
```

### Font Stack
- Use whatever fonts the PrimeNG Freya/Atlantis/Apollo theme provides by default
- Ensure `font-size` is controlled by `document.documentElement.style.fontSize` via the scale setting (default 14px)

### Menu Styles
```scss
.active-link > a { background-color: var(--primary-color) !important; color: #ffffff !important; border-radius: 6px; }
li:not(.active-link) > a:hover { background-color: color-mix(in srgb, var(--primary-color) 20%, transparent) !important; border-radius: 6px; }
```

### Quick Link Glow Animation
```scss
@keyframes quick-link-glow {
  0%, 100% { box-shadow: 0 0 4px 1px rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 0 10px 3px rgba(245, 158, 11, 0.55); }
}
```

### Logo Animations
```scss
.university-logo { border-radius: 50%; border: 2px solid rgba(255,255,255,0.4); transition: transform 0.6s; }
.university-logo.flip { transform: rotateY(360deg); scale: 1.5; }
```

---

## 📌 PART 9: COMPONENT IMPLEMENTATION RULES

### For ALL leaf components (masters, transactions, reports):
```typescript
@Component({
  selector: 'app-{name}',
  standalone: true,
  imports: [CommonModule, /* PrimeNG modules as needed */],
  template: `
    <div class="card">
      <h5>{Component Title}</h5>
      <p class="text-color-secondary">This module is under development.</p>
    </div>
  `
})
export class {Name}Component {}
```

### For ALL dashboard components:
- Full layout with KPI cards, charts, lists as specified in Part 4/5/6
- All data is **hardcoded dummy data** — no services, no API calls
- Use `@if` / `@for` control flow (Angular 22 syntax)
- Include skeleton loaders toggled by a simple `loading = false` property

### For Generic Components (generic-table, generic-manage, generic-view):
- Create as standalone components with basic p-table, p-dialog, p-card wrappers
- Accept `@Input()` for configuration but no real logic

### For Exception Pages:
- Create visually complete pages (404, 403, 500, Token Expired, Under Progress)
- Each should have an icon, heading, description, and "Go Home" button

---

## 📌 PART 10: WHAT TO **NOT** PORT / KEEP FROM NEW PROJECT

| Aspect | Keep from OLD | Keep from NEW |
|--------|:---:|:---:|
| Folder structure | ✅ | |
| Module organization | ✅ | |
| Dashboard layouts | ✅ | |
| KPI card patterns | ✅ | |
| Card, font, spacing styles | ✅ | |
| Scrollbar, animations | ✅ | |
| Skeleton components | ✅ | |
| Menu structure & icons | ✅ | |
| **Dark mode / Light mode system** | | ✅ |
| **Color theme selection** | | ✅ |
| **PrimeNG theme CSS files** | | ✅ |
| **Layout theme files** | | ✅ |
| Business logic / API calls | ❌ | |
| Real authentication | ❌ | |
| NgRx store logic | ❌ | |
| SignalR real-time | ❌ | |

---

## 📌 PART 11: ANGULAR 22 MIGRATION NOTES

1. **No NgModules** — Use standalone components throughout. Use `provideRouter()`, `provideHttpClient()`, `provideAnimations()` in `app.config.ts`
2. **New Control Flow** — Use `@if`, `@else`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`
3. **Signals** — Use Angular signals for state management where appropriate
4. **PrimeNG 19+** — Some component APIs changed:
   - `p-dropdown` → `p-select` (or check latest PrimeNG 19 API)
   - Import paths may differ
   - `p-sidebar` → `p-drawer` (check migration guide)
5. **Lazy Loading** — Use `loadComponent` and `loadChildren` with functional route configs
6. **Route Guards** — Use functional guards (`canActivate: [() => true]`)
7. **Interceptors** — Use functional interceptors with `withInterceptors()`
8. **Build** — Use `@angular/build:application` builder (not `browser-esbuild`)

---

## 📌 EXECUTION ORDER

1. Create Angular 22 project with CLI
2. Install dependencies (PrimeNG, PrimeFlex, PrimeIcons, FontAwesome, Chart.js, FullCalendar, Quill)
3. Set up `styles.scss` with global styles
4. Set up `index.html` with splash screen + theme link
5. Create `layout/` shell (topbar, sidebar, menu, footer, config, breadcrumb)
6. Create `shared/` (guards, interceptors, pipes, services, models — all stubs)
7. Create `global/` (generic components, skeletons, exception pages)
8. Create `dashboard/` (main dashboard with full KPI layout)
9. Create each feature module folder structure + routing + dashboard
10. Create leaf component stubs for all masters/transactions/reports
11. Wire up all routing (app.routes.ts → lazy-loaded modules)
12. Verify build compiles without errors
