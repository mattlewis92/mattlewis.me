import {
  Operation,
  Plugin,
  PluginFactory,
  VersionWorker,
} from '@angular/service-worker/worker';

export function BackgroundSync(): PluginFactory<BackgroundSyncImpl> {
  return (worker: VersionWorker) => new BackgroundSyncImpl(worker);
}

export class BackgroundSyncImpl implements Plugin<BackgroundSyncImpl> {

  constructor(private worker: VersionWorker) {}

  setup(operations: Operation[]): void {
  }

}