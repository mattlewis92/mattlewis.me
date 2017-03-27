export function getServiceWorkerMessageStorageKey(uuid: string) {
  return `background-sync-${uuid}`;
}