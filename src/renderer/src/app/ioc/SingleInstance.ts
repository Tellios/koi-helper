export function SingleInstance(): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (target: Function) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (target as any).__isSingleInstance = true;
  };
}
