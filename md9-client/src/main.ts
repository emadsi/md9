import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
}).catch(err => console.error(err));

// import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideRouter } from '@angular/router';

// import { routes } from './app/app.routes';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(), 
//     provideRouter(routes), 
//     provideAnimationsAsync(),
//     provideClientHydration()
//   ],
// }).catch((err) => console.error(err));
