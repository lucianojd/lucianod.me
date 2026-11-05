export function parseSearchParam<E>(
  searchParam: string | null,
  defaultValue?: E,
): E | null {
  if (searchParam === null || searchParam === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return null;
  }
  return searchParam as E;
}

export function parseSearchParamInt(
  searchParam: string | null,
  defaultValue?: number,
): number | null {
  if (searchParam === null || searchParam === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return null;
  }
  const parsed = parseInt(searchParam, 10);
  if (isNaN(parsed)) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return null;
  }
  return parsed;
}
