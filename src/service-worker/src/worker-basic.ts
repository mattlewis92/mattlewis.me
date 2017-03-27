import { StaticContentCache } from '@angular/service-worker/plugins/static';
import { bootstrapServiceWorker } from '@angular/service-worker/worker';
import { BackgroundSync } from './plugins/background-sync';

bootstrapServiceWorker({
  manifestUrl: 'ngsw-manifest.json',
  plugins: [
    StaticContentCache(),
    BackgroundSync()
  ]
});