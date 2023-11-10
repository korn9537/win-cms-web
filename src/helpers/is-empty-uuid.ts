export function isEmptyUUID(uuid: string): string | undefined {
  if (uuid === null || uuid === undefined || uuid === '' || uuid === '00000000-0000-0000-0000-000000000000') {
    return undefined;
  }

  return uuid;
}
