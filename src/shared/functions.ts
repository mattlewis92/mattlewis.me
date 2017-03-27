export function getServiceWorkerMessageStorageKey(uuid: string): string {
  return `background-sync-${uuid}`;
}