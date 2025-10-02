

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from '../../app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient()
//   ]
// };

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from '../../app.routes';
import { authInterceptor } from '../interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    // Performansı artırmaq üçün
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router konfiqurasiyası
    provideRouter(routes, withEnabledBlockingInitialNavigation()),

    // HTTP client + fetch API + interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};
