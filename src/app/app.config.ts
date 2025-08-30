import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import appProviders from './app-providers.config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

const icons = Object.values(AllIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNzIcons(icons),
    { provide: NZ_I18N, useValue: es_ES },
    ...appProviders
  ]
};
