import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { JbIconModule } from 'jb-component-library';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    JbIconModule.withIcons().providers,
  ],
}).catch((error) =>
  console.error(
    '[cb-seat-map-demo] Unexpected error occurred while bootstrapping the application:',
    error
  )
);
