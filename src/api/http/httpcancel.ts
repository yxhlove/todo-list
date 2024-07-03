export const abortControllers: Map<symbol, AbortController> = new Map();

export const cancelRequest = (cancelToken: symbol) => {
  if (abortControllers.has(cancelToken)) {
    abortControllers.get(cancelToken)?.abort();
    abortControllers.delete(cancelToken);
  }
};

export const cancelAllRequest = () => {
  for (const abortController of abortControllers.values()) {
    abortController.abort();
  }
  abortControllers.clear();
};
