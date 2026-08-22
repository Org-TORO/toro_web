
let refreshPromise: Promise<string> | null = null;

export const getRefreshPromise = (): Promise<string> | null => {
  return refreshPromise;
};

export const setRefreshPromise = (
  promise: Promise<string> | null
): void => {
  refreshPromise = promise;
};