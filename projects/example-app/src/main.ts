import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  hmrBootstrap,
  HmrNodeModule,
  isHmrNodeModule,
} from './hot-module-replacement';

declare const module: Partial<HmrNodeModule>;

function bootstrap(): Promise<void | NgModuleRef<AppModule>> {
  return platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(error => console.error(error));
}

if (environment.production) {
  enableProdMode();
}

if (environment.hmr) {
  if (isHmrNodeModule(module)) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('Hot Module Replacement is disabled for webpack-dev-server.');
    // tslint:disable-next-line:no-console
    console.info('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
