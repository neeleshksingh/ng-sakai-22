import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './app/shared/interceptors/auth.interceptor';
import { environment } from './environments/environment';
import { provideAppStore } from './app/store/provider';
import { progressBarInterceptor } from './app/shared/interceptors/progress-bar.interceptor';
import { errorInterceptor } from './app/shared/interceptors/error.interceptor';
import { appsRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appsRoutes, withHashLocation(), withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor, progressBarInterceptor, errorInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({
            license: environment.primeUiLicense,
            theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } }
        }),
        MessageService,
        ConfirmationService,
        provideAppStore()
    ]
};
