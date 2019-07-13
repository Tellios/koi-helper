/**
 * Creates a wrapper function for multiple unbind functions.
 * Calling the function will result in all unbind functions
 * being called in the order they were added.
 */
export function combineUnbinds(unbinds: Array<() => void>) {
  return () => {
    unbinds.forEach(unbind => unbind());
  };
}
